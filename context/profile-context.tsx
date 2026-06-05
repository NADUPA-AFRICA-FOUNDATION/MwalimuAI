'use client'

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { syncActivityFromSupabase } from '@/lib/streak'
import { setLearningProgressUser, loadProgressFromCloud } from '@/lib/learning-progress'
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
  lang:         Lang
  setLang:      (l: Lang) => void
  toggleLang:   () => void
}

const ProfileContext = createContext<ProfileContextType>({
  user: null, authLoading: true, signOut: async () => {},
  profile: null, setProfile: async () => {}, clearProfile: () => {},
  mounted: false,
  lang: 'en', setLang: () => {}, toggleLang: () => {},
})

const PROFILE_KEY = 'mwalimu_profile'
const LANG_KEY    = 'mwalimu_lang'

const ALL_USER_KEYS = [
  PROFILE_KEY, LANG_KEY,
  'mwalimu_community', 'mwalimu_learning_progress', 'mwalimu_activity',
  'mwalimu_tools_used', 'mwalimu_journal', 'mwalimu_goals',
  'mwalimu_discussions', 'mwalimu_current_lesson',
]

function clearLocalUserData() {
  if (typeof window === 'undefined') return
  ALL_USER_KEYS.forEach(key => { try { localStorage.removeItem(key) } catch {} })
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

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [profile, setProfileState]    = useState<TeacherProfile | null>(null)
  const [lang, setLangState]          = useState<Lang>('en')
  const [mounted, setMounted]         = useState(false)
  const supabase = createClient()

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
                  }).then(() => {}, () => {})
                }
              }
            }
          } catch {
            const local = localStorage.getItem(PROFILE_KEY)
            if (local) setProfileState(JSON.parse(local) as TeacherProfile)
          }

          const storedLang = localStorage.getItem(LANG_KEY) as Lang | null
          if (storedLang === 'en' || storedLang === 'sw') setLangState(storedLang)

          // Sync streak activity from Supabase → localStorage (background)
          syncActivityFromSupabase(nextUser.id).catch(() => {})
          // Wire learning progress cloud sync and load from cloud
          setLearningProgressUser(nextUser.id)
          loadProgressFromCloud(nextUser.id).catch(() => {})
        } else {
          setProfileState(null)
        }

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
      try {
        await supabase.from('profiles').upsert({
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
      } catch (e) {
        console.error('Failed to save profile:', e)
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
      supabase.from('profiles').upsert({ id: user.id, lang: l, updated_at: new Date().toISOString() }).then(() => {}, () => {})
    }
  }, [user, supabase])

  const toggleLang = useCallback(() => {
    setLangState(prev => {
      const next: Lang = prev === 'en' ? 'sw' : 'en'
      if (typeof window !== 'undefined') document.documentElement.lang = next === 'sw' ? 'sw' : 'en'
      try { localStorage.setItem(LANG_KEY, next) } catch {}
      if (user) {
        supabase.from('profiles').upsert({ id: user.id, lang: next, updated_at: new Date().toISOString() }).then(() => {}, () => {})
      }
      return next
    })
  }, [user, supabase])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setLearningProgressUser(null)
    clearLocalUserData()
    clearProfile()
  }, [clearProfile, supabase])

  return (
    <ProfileContext.Provider value={{
      user, authLoading, signOut,
      profile, setProfile, clearProfile, mounted,
      lang, setLang, toggleLang,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
