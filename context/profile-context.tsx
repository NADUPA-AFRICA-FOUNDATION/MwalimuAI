'use client'

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { syncActivityFromSupabase, syncToolsUsedFromSupabase, syncCommunityPostsFromSupabase } from '@/lib/streak'
import { setLearningProgressUser, loadProgressFromCloud } from '@/lib/learning-progress'
import { setA11yUser, applyA11y, type A11ySettings } from '@/lib/a11y-settings'
import { setAccessibilityUser } from '@/lib/accessibility'
import { trackWrite, flushWrites } from '@/lib/write-queue'
import { type Lang } from '@/lib/i18n'

export interface TeacherProfile {
  name:      string
  school:    string
  county:    string
  subjects:  string[]
  grades:    string[]
  cbcLevel:  'beginner' | 'intermediate' | 'advanced'
  completed: boolean
}

interface ProfileContextType {
  user:         User | null
  authLoading:  boolean
  signOut:      () => Promise<void>
  profile:      TeacherProfile | null
  setProfile:   (p: TeacherProfile) => Promise<void>
  clearProfile: () => void
  mounted:      boolean
  syncReady:    boolean
  lang:         Lang
  setLang:      (l: Lang) => void
  toggleLang:   () => void
}

const ProfileContext = createContext<ProfileContextType>({
  user: null, authLoading: true, signOut: async () => {},
  profile: null, setProfile: async () => {}, clearProfile: () => {},
  mounted: false, syncReady: false,
  lang: 'en', setLang: () => {}, toggleLang: () => {},
})

const PROFILE_KEY  = 'mwalimu_profile'
const LANG_KEY     = 'mwalimu_lang'
const USER_ID_KEY  = 'mwalimu_user_id'

// All keys that belong to a specific user — cleared when a DIFFERENT user signs in.
const ALL_USER_KEYS = [
  PROFILE_KEY, LANG_KEY, USER_ID_KEY,
  'mwalimu_learning_progress', 'mwalimu_activity', 'mwalimu_tools_used',
  'mwalimu_community_post_count',
  'mwalimu_journal', 'mwalimu_discussions', 'mwalimu_current_lesson',
  'mwalimu_notifications_state', 'mwalimu_assessment',
  'mwalimu_a11y', 'mwalimu_low_bandwidth', 'mwalimu_sidebar_collapsed',
]

// Keys that are session/preference-only and safe to clear on every sign-out.
// Progress keys (learning_progress, activity, tools_used, journal, discussions)
// are intentionally omitted so same-user re-login keeps local data as a fallback
// in case any Supabase writes were lost.
const SESSION_KEYS = [
  PROFILE_KEY, LANG_KEY,
  'mwalimu_current_lesson', 'mwalimu_assessment',
  'mwalimu_notifications_state',
  'mwalimu_a11y', 'mwalimu_low_bandwidth', 'mwalimu_sidebar_collapsed',
]

function clearLocalUserData() {
  if (typeof window === 'undefined') return
  ALL_USER_KEYS.forEach(key => { try { localStorage.removeItem(key) } catch {} })
}

function clearSessionData() {
  if (typeof window === 'undefined') return
  SESSION_KEYS.forEach(key => { try { localStorage.removeItem(key) } catch {} })
}

// Map Supabase snake_case columns → TeacherProfile camelCase
function dbToProfile(row: Record<string, unknown>): TeacherProfile {
  return {
    name:      (row.name      as string)  ?? '',
    school:    (row.school    as string)  ?? '',
    county:    (row.county    as string)  ?? '',
    subjects:  (row.subjects  as string[]) ?? [],
    grades:    (row.grades    as string[]) ?? [],
    cbcLevel:  ((row.cbc_level as string) ?? 'beginner') as TeacherProfile['cbcLevel'],
    completed: (row.completed as boolean) ?? false,
  }
}

// Seed localStorage from the preference columns on the profile row.
// Called after every successful profile load from Supabase so all
// setting modules (a11y, accessibility, notification-center, layout)
// read the correct user values on mount.
function applyPrefsFromRow(row: Record<string, unknown>, userId: string, accountCreatedAt: string) {
  // ── Accessibility settings ──────────────────────────────────
  if (row.a11y_settings) {
    try { localStorage.setItem('mwalimu_a11y', JSON.stringify(row.a11y_settings)) } catch {}
    applyA11y(row.a11y_settings as A11ySettings)
  }

  // ── Low-bandwidth mode ──────────────────────────────────────
  if (typeof row.low_bandwidth === 'boolean') {
    try { localStorage.setItem('mwalimu_low_bandwidth', String(row.low_bandwidth)) } catch {}
  }

  // ── Sidebar collapsed ──────────────────────────────────────
  if (typeof row.sidebar_collapsed === 'boolean') {
    try { localStorage.setItem('mwalimu_sidebar_collapsed', String(row.sidebar_collapsed)) } catch {}
  }

  // ── Notification read/dismissed state ──────────────────────
  // Prefer the cloud value; for returning users whose cloud value is
  // still the default empty array, fall back to the 24 h auto-seed.
  const cloudNotif = row.notifications_state as { read: string[]; dismissed: string[] } | null
  const hasCloudNotifData = cloudNotif && (cloudNotif.read.length > 0 || cloudNotif.dismissed.length > 0)

  if (hasCloudNotifData) {
    try { localStorage.setItem('mwalimu_notifications_state', JSON.stringify(cloudNotif)) } catch {}
  } else if (!localStorage.getItem('mwalimu_notifications_state')) {
    // No cloud data and no local cache — auto-seed for returning users so
    // they are not re-shown onboarding notifications on every new device.
    const accountAgeMs = Date.now() - new Date(accountCreatedAt).getTime()
    if (accountAgeMs > 24 * 60 * 60 * 1000) {
      const seeded = { read: ['welcome', 'module-1', 'assessment-cta'], dismissed: [] }
      try { localStorage.setItem('mwalimu_notifications_state', JSON.stringify(seeded)) } catch {}
      // Persist the seed to Supabase so it is ready on the next new device
      const supabase = createClient()
      trackWrite(supabase
        .from('profiles')
        .upsert({ id: userId, notifications_state: seeded, updated_at: new Date().toISOString() }))
    }
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [profile, setProfileState]    = useState<TeacherProfile | null>(null)
  const [lang, setLangState]          = useState<Lang>('en')
  const [mounted, setMounted]         = useState(false)
  const [syncReady, setSyncReady]     = useState(false)
  // Stable client — one instance per provider lifecycle so all writes share
  // the same auth session and onAuthStateChange fires exactly once.
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setAuthLoading(false)
        setMounted(true)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const nextUser = session?.user ?? null
        setUser(nextUser)

        if (nextUser) {
          // Reset syncReady so the dashboard waits for fresh cloud data
          setSyncReady(false)

          // If a DIFFERENT user is signing in, wipe the previous user's data.
          // Same-user re-login keeps local progress as a fallback (cloud sync
          // will overwrite with authoritative data once syncReady fires).
          if (typeof window !== 'undefined') {
            const prevId = localStorage.getItem(USER_ID_KEY)
            if (prevId && prevId !== nextUser.id) {
              clearLocalUserData()
            }
            try { localStorage.setItem(USER_ID_KEY, nextUser.id) } catch {}
          }

          // Wire per-user Supabase sync for all setting modules
          setLearningProgressUser(nextUser.id)
          setA11yUser(nextUser.id)
          setAccessibilityUser(nextUser.id)

          // Load profile from Supabase, fall back to localStorage cache when offline
          try {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', nextUser.id)
              .maybeSingle()

            const row = data as Record<string, unknown> | null

            if (row?.completed) {
              // Cloud has a finished profile — use it as source of truth
              const p = dbToProfile(row)
              setProfileState(p)
              localStorage.setItem(PROFILE_KEY, JSON.stringify(p))
              if (row.lang === 'en' || row.lang === 'sw') setLangState(row.lang as Lang)
              // Apply all preference columns to localStorage/DOM
              applyPrefsFromRow(row, nextUser.id, nextUser.created_at)
            } else {
              // Cloud has no row or an incomplete row — prefer localStorage cache
              const local = localStorage.getItem(PROFILE_KEY)
              if (local) {
                const cached = JSON.parse(local) as TeacherProfile
                setProfileState(cached)
                // Re-sync completed profile back to cloud so future logins work without localStorage
                if (cached.completed) {
                  supabase.from('profiles').upsert({
                    id:        nextUser.id,
                    name:      cached.name,
                    school:    cached.school,
                    county:    cached.county,
                    subjects:  cached.subjects,
                    grades:    cached.grades,
                    cbc_level: cached.cbcLevel,
                    completed: true,
                    updated_at: new Date().toISOString(),
                  }).then(
                    ({ error }) => { if (error) console.error('[Profile] Re-sync failed:', error.message) },
                    (err) => console.error('[Profile] Re-sync error:', err),
                  )
                }
              }
              // Still try to apply prefs from partial row (may have non-profile pref columns)
              if (row) applyPrefsFromRow(row, nextUser.id, nextUser.created_at)
            }
          } catch {
            const local = localStorage.getItem(PROFILE_KEY)
            if (local) setProfileState(JSON.parse(local) as TeacherProfile)
          }

          const storedLang = localStorage.getItem(LANG_KEY) as Lang | null
          if (storedLang === 'en' || storedLang === 'sw') setLangState(storedLang)

          // Kick off cloud syncs in the background. setSyncReady(true) fires when
          // all three settle so the dashboard knows localStorage is freshly populated.
          Promise.allSettled([
            syncActivityFromSupabase(nextUser.id),
            syncToolsUsedFromSupabase(nextUser.id),
            loadProgressFromCloud(nextUser.id),
            syncCommunityPostsFromSupabase(nextUser.id),
          ]).then(() => setSyncReady(true))
        } else {
          // Session gone (sign-out or expiry) — null out all module user IDs
          // so subsequent writes don't attempt authenticated Supabase calls
          // with a stale (now-invalid) token.
          setLearningProgressUser(null)
          setA11yUser(null)
          setAccessibilityUser(null)
          setProfileState(null)
          setSyncReady(false)
        }

        // Always resolve auth and mount together — never leave the app in a
        // partial state where authLoading=false but mounted=false.
        setAuthLoading(false)
        setMounted(true)
      }
    )

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setProfile = useCallback(async (p: TeacherProfile) => {
    setProfileState(p)
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p))

    if (user) {
      // supabase never throws — errors come back as { error }, not exceptions.
      const { error } = await supabase.from('profiles').upsert({
        id:        user.id,
        name:      p.name,
        school:    p.school,
        county:    p.county,
        subjects:  p.subjects,
        grades:    p.grades,
        cbc_level: p.cbcLevel,
        lang,
        completed: p.completed,
        updated_at: new Date().toISOString(),
      })
      if (error) {
        console.error('[Profile] Cloud save failed:', error.message)
        // Profile is already in localStorage; cloud will re-sync on next login.
      }
    }
  }, [user, lang, supabase])

  const clearProfile = useCallback(() => {
    setProfileState(null)
    try { localStorage.removeItem(PROFILE_KEY) } catch {}
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') document.documentElement.lang = l === 'sw' ? 'sw' : 'en'
    try { localStorage.setItem(LANG_KEY, l) } catch {}
    if (user) {
      trackWrite(supabase.from('profiles').upsert({ id: user.id, lang: l, updated_at: new Date().toISOString() }))
    }
  }, [user, supabase])

  const toggleLang = useCallback(() => {
    setLangState(prev => {
      const next: Lang = prev === 'en' ? 'sw' : 'en'
      if (typeof window !== 'undefined') document.documentElement.lang = next === 'sw' ? 'sw' : 'en'
      try { localStorage.setItem(LANG_KEY, next) } catch {}
      if (user) {
        trackWrite(supabase.from('profiles').upsert({ id: user.id, lang: next, updated_at: new Date().toISOString() }))
      }
      return next
    })
  }, [user, supabase])

  const signOut = useCallback(async () => {
    // Drain all in-flight writes before invalidating the session token.
    await flushWrites()
    // Stamp the user ID so same-user re-login recognises the local cache
    // as belonging to them and skips the full data wipe.
    if (user && typeof window !== 'undefined') {
      try { localStorage.setItem(USER_ID_KEY, user.id) } catch {}
    }
    await supabase.auth.signOut()
    setLearningProgressUser(null)
    setA11yUser(null)
    setAccessibilityUser(null)
    // Only clear session/preference data. Progress keys (learning_progress,
    // activity, tools_used, etc.) are preserved so re-login can use them as
    // a local fallback even if Supabase writes were lost.
    clearSessionData()
    clearProfile()
  }, [user, clearProfile, supabase])

  return (
    <ProfileContext.Provider value={{
      user, authLoading, signOut,
      profile, setProfile, clearProfile, mounted, syncReady,
      lang, setLang, toggleLang,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
