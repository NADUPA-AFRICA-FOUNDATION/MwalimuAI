'use client'

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from 'react'
import {
  type User,
  onAuthStateChanged,
  signOut as fbSignOut,
} from 'firebase/auth'
import {
  doc, getDoc, setDoc, serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { syncActivityFromFirestore } from '@/lib/streak'
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
  // auth
  user:        User | null
  authLoading: boolean
  signOut:     () => Promise<void>
  // profile
  profile:     TeacherProfile | null
  setProfile:  (p: TeacherProfile) => Promise<void>
  clearProfile: () => void
  mounted:     boolean
  // language
  lang:        Lang
  setLang:     (l: Lang) => void
  toggleLang:  () => void
}

const ProfileContext = createContext<ProfileContextType>({
  user: null, authLoading: true, signOut: async () => {},
  profile: null, setProfile: async () => {}, clearProfile: () => {},
  mounted: false,
  lang: 'en', setLang: () => {}, toggleLang: () => {},
})

const PROFILE_KEY  = 'mwalimu_profile'
const LANG_KEY     = 'mwalimu_lang'
const LAST_UID_KEY = 'mwalimu_last_uid'

// All localStorage keys that belong to a single user session
const ALL_USER_KEYS = [
  PROFILE_KEY, LANG_KEY, LAST_UID_KEY,
  'mwalimu_community', 'mwalimu_learning_progress', 'mwalimu_activity',
  'mwalimu_tools_used', 'mwalimu_journal', 'mwalimu_goals',
  'mwalimu_discussions', 'mwalimu_current_lesson',
]

function clearLocalUserData() {
  if (typeof window === 'undefined') return
  ALL_USER_KEYS.forEach(key => { try { localStorage.removeItem(key) } catch {} })
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [profile, setProfileState]    = useState<TeacherProfile | null>(null)
  const [lang, setLangState]          = useState<Lang>('en')
  const [mounted, setMounted]         = useState(false)

  // Listen to Firebase auth state — single source of truth
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false)
      setMounted(true)
      return
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // Detect user switch — clear previous user's local data before loading new user
        const lastUid = typeof window !== 'undefined' ? localStorage.getItem(LAST_UID_KEY) : null
        if (lastUid && lastUid !== firebaseUser.uid) {
          clearLocalUserData()
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(LAST_UID_KEY, firebaseUser.uid)
        }

        // Try Firestore first, fall back to localStorage cache when offline
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) {
            const data = snap.data() as TeacherProfile & { lang?: Lang }
            setProfileState(data)
            localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
            if (data.lang === 'en' || data.lang === 'sw') setLangState(data.lang)
          } else {
            // New user — migrate any locally stored profile (returning users upgrading)
            const local = localStorage.getItem(PROFILE_KEY)
            if (local) {
              const localProfile = JSON.parse(local) as TeacherProfile
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                ...localProfile,
                createdAt: serverTimestamp(),
              })
              setProfileState(localProfile)
            }
          }
        } catch {
          // Offline — use localStorage cache
          const local = localStorage.getItem(PROFILE_KEY)
          if (local) setProfileState(JSON.parse(local) as TeacherProfile)
        }

        // Restore language preference
        const storedLang = localStorage.getItem(LANG_KEY) as Lang | null
        if (storedLang === 'en' || storedLang === 'sw') setLangState(storedLang)

        // Sync streak/activity from Firestore → localStorage (runs in background)
        syncActivityFromFirestore(firebaseUser.uid).catch(() => {})
      } else {
        setProfileState(null)
      }

      setAuthLoading(false)
      setMounted(true)
    })

    return unsub
  }, [])

  const setProfile = useCallback(async (p: TeacherProfile) => {
    setProfileState(p)
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p))

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          ...p,
          lang,
          updatedAt: serverTimestamp(),
        }, { merge: true })
      } catch (e) {
        console.error('Failed to save profile:', e)
      }
    }
  }, [user, lang])

  const clearProfile = useCallback(() => {
    setProfileState(null)
    try { localStorage.removeItem(PROFILE_KEY) } catch {}
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') document.documentElement.lang = l === 'sw' ? 'sw' : 'en'
    try { localStorage.setItem(LANG_KEY, l) } catch {}
    if (user) {
      setDoc(doc(db, 'users', user.uid), { lang: l }, { merge: true }).catch(() => {})
    }
  }, [user])

  const toggleLang = useCallback(() => {
    setLangState(prev => {
      const next: Lang = prev === 'en' ? 'sw' : 'en'
      if (typeof window !== 'undefined') document.documentElement.lang = next === 'sw' ? 'sw' : 'en'
      try { localStorage.setItem(LANG_KEY, next) } catch {}
      if (user) {
        setDoc(doc(db, 'users', user.uid), { lang: next }, { merge: true }).catch(() => {})
      }
      return next
    })
  }, [user])

  const signOut = useCallback(async () => {
    await fbSignOut(auth)
    // Clear all user-specific local data so the next user starts fresh
    clearLocalUserData()
    clearProfile()
  }, [clearProfile])

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
