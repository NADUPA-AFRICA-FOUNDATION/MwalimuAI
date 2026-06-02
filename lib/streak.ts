// Streak tracking and badge computation
// Primary: localStorage for fast reads. Firestore used as cloud sync (fire-and-forget).

import { doc, setDoc, getDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const ACTIVITY_KEY  = 'mwalimu_activity'
const TOOLS_KEY     = 'mwalimu_tools_used'

export type ActivityType = 'lesson' | 'tool' | 'journal' | 'community' | 'login' | 'assessment'

interface ActivityEntry {
  date: string  // YYYY-MM-DD
  type: ActivityType
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function loadActivity(): ActivityEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY)
    return raw ? (JSON.parse(raw) as ActivityEntry[]) : []
  } catch { return [] }
}

function saveActivity(entries: ActivityEntry[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(entries))
}

export function recordActivity(type: ActivityType, uid?: string) {
  if (typeof window === 'undefined') return
  const entries = loadActivity()
  const d = today()
  // Avoid duplicate entries for the same day + type
  if (!entries.some(e => e.date === d && e.type === type)) {
    entries.push({ date: d, type })
    saveActivity(entries)
  }
  // Sync to Firestore if uid provided (fire-and-forget, doesn't block UI)
  if (uid) {
    const activityRef = doc(db, 'users', uid, 'activity', d)
    getDoc(activityRef).then(snap => {
      const existing: string[] = snap.exists() ? (snap.data().types as string[]) : []
      if (!existing.includes(type)) {
        setDoc(activityRef, {
          date: d,
          types: [...existing, type],
          updatedAt: serverTimestamp(),
        }).catch(() => {})
      }
    }).catch(() => {})
  }
}

/**
 * Pull activity from Firestore into localStorage so streak is accurate on new devices.
 * Call once after the user signs in.
 */
export async function syncActivityFromFirestore(uid: string): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const snap = await getDocs(collection(db, 'users', uid, 'activity'))
    const local = loadActivity()
    const merged = [...local]
    snap.docs.forEach(d => {
      const data = d.data() as { date: string; types: string[] }
      data.types.forEach(t => {
        if (!merged.some(e => e.date === data.date && e.type === t)) {
          merged.push({ date: data.date, type: t as ActivityType })
        }
      })
    })
    saveActivity(merged)
  } catch {}
}

export function recordToolUsed(toolId: string) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(TOOLS_KEY)
    const used: string[] = raw ? JSON.parse(raw) : []
    if (!used.includes(toolId)) {
      used.push(toolId)
      localStorage.setItem(TOOLS_KEY, JSON.stringify(used))
    }
  } catch {}
}

export function getToolsUsedCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(TOOLS_KEY)
    return raw ? (JSON.parse(raw) as string[]).length : 0
  } catch { return 0 }
}

export interface StreakData {
  current:   number
  longest:   number
  totalDays: number
  weekDays:  boolean[]  // Sun=0 … Sat=6, true if active this week
}

export function getStreak(): StreakData {
  const entries = loadActivity()
  if (entries.length === 0) return { current: 0, longest: 0, totalDays: 0, weekDays: Array(7).fill(false) }

  // Unique dates with activity
  const dates = [...new Set(entries.map(e => e.date))].sort()

  const totalDays = dates.length

  // Current streak (consecutive days ending today or yesterday)
  let current = 0
  const todayStr = today()
  const msPerDay = 86400000
  const todayMs  = new Date(todayStr).getTime()

  for (let i = dates.length - 1; i >= 0; i--) {
    const dMs = new Date(dates[i]).getTime()
    const diffDays = Math.round((todayMs - dMs) / msPerDay)
    if (diffDays === current || diffDays === current + 1) {
      // Allow the streak to start from yesterday if no activity today yet
      if (diffDays === current + 1 && current === 0) { current = 1; continue }
      if (diffDays === current) { current++; continue }
    }
    break
  }
  // Re-count properly: walk backwards from today
  current = 0
  for (let offset = 0; offset < 365; offset++) {
    const checkDate = new Date(todayMs - offset * msPerDay).toISOString().slice(0, 10)
    if (dates.includes(checkDate)) {
      current++
    } else if (offset === 0) {
      // No activity today — check if yesterday was active (streak still valid)
      continue
    } else {
      break
    }
  }

  // Longest streak
  let longest = 0
  let run = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]).getTime()
    const curr = new Date(dates[i]).getTime()
    if (Math.round((curr - prev) / msPerDay) === 1) {
      run++
      longest = Math.max(longest, run)
    } else {
      run = 1
    }
  }
  longest = Math.max(longest, run, current)

  // Week grid — Mon–Sun (ISO week, Mon=0)
  const weekDays: boolean[] = Array(7).fill(false)
  for (let i = 0; i < 7; i++) {
    const d = new Date(todayMs - i * msPerDay).toISOString().slice(0, 10)
    // weekDays[0] = today, [6] = 6 days ago
    weekDays[i] = dates.includes(d)
  }

  return { current, longest, totalDays, weekDays }
}

// ── Badge definitions & computation ─────────────────────────

export interface BadgeDef {
  id: string
  name: string
  desc: string
  icon: string  // lucide icon name
  color: string // Tailwind color class
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: 'first-lesson',   name: 'First Step',          desc: 'Completed your first lesson',                 icon: 'BookOpen',       color: 'blue'   },
  { id: 'module-master',  name: 'Module Master',        desc: 'Completed a full module (3 lessons)',         icon: 'BookMarked',     color: 'purple' },
  { id: 'program-grad',   name: 'Program Graduate',     desc: 'Earned your first certificate',               icon: 'GraduationCap',  color: 'amber'  },
  { id: 'week-warrior',   name: 'Week Warrior',         desc: '7-day learning streak',                       icon: 'Flame',          color: 'orange' },
  { id: 'month-learner',  name: 'Dedicated Learner',    desc: '30 total days of learning activity',          icon: 'Calendar',       color: 'green'  },
  { id: 'reflective',     name: 'Reflective Teacher',   desc: 'Wrote 5 journal entries',                     icon: 'PenLine',        color: 'pink'   },
  { id: 'community-voice',name: 'Community Voice',      desc: 'Posted in the teacher community',             icon: 'Users',          color: 'teal'   },
  { id: 'tool-ninja',     name: 'Tool Ninja',           desc: 'Used 4 different AI teacher tools',           icon: 'Wand2',          color: 'violet' },
  { id: 'researcher',     name: 'Action Researcher',    desc: 'Completed the Action Research guide',         icon: 'FlaskConical',   color: 'cyan'   },
  { id: 'wellbeing-champ',name: 'Wellness Champion',    desc: 'Completed the Teacher Wellbeing program',     icon: 'Heart',          color: 'rose'   },
  { id: 'kiswahili',      name: 'Lugha Mbili',          desc: 'Used the Kiswahili mode',                     icon: 'Globe',          color: 'emerald'},
  { id: 'early-adopter',  name: 'Early Adopter',        desc: '10+ days of learning activity',               icon: 'Star',           color: 'yellow' },
]

export interface BadgeStatus extends BadgeDef {
  earned: boolean
  earnedDate?: string
}

interface BadgeInput {
  completedLessons:  number
  completedModules:  number
  certificates:      number
  journalEntries:    number
  communityPosts:    number
  toolsUsed:         number
  actionResearch:    boolean
  wellbeingProgram:  boolean
  usedSwahili:       boolean
  streak:            StreakData
}

export function computeBadges(input: BadgeInput): BadgeStatus[] {
  const earned = new Set<string>()

  if (input.completedLessons >= 1)   earned.add('first-lesson')
  if (input.completedModules >= 1)   earned.add('module-master')
  if (input.certificates >= 1)       earned.add('program-grad')
  if (input.streak.current >= 7)     earned.add('week-warrior')
  if (input.streak.totalDays >= 30)  earned.add('month-learner')
  if (input.journalEntries >= 5)     earned.add('reflective')
  if (input.communityPosts >= 1)     earned.add('community-voice')
  if (input.toolsUsed >= 4)          earned.add('tool-ninja')
  if (input.actionResearch)          earned.add('researcher')
  if (input.wellbeingProgram)        earned.add('wellbeing-champ')
  if (input.usedSwahili)             earned.add('kiswahili')
  if (input.streak.totalDays >= 10)  earned.add('early-adopter')

  return BADGE_DEFS.map(b => ({ ...b, earned: earned.has(b.id) }))
}

// Derive badge input from localStorage
export function getBadgeInput(): BadgeInput {
  if (typeof window === 'undefined') {
    return { completedLessons: 0, completedModules: 0, certificates: 0, journalEntries: 0, communityPosts: 0, toolsUsed: 0, actionResearch: false, wellbeingProgram: false, usedSwahili: false, streak: { current: 0, longest: 0, totalDays: 0, weekDays: Array(7).fill(false) } }
  }

  // Learning progress
  let completedLessons = 0
  let completedModules = 0
  let certificates     = 0
  let wellbeingProgram = false
  try {
    const raw = localStorage.getItem('mwalimu_learning_progress')
    if (raw) {
      const all = JSON.parse(raw) as Record<string, { completedLessons: string[]; certificateEarnedAt?: string }>
      for (const [programId, p] of Object.entries(all)) {
        completedLessons += p.completedLessons?.length ?? 0
        // Count modules: group lesson ids by prefix (m1/, m2/, m3/)
        const modules = new Set(p.completedLessons?.map(id => id.split('/')[0]) ?? [])
        modules.forEach(m => { if (p.completedLessons?.filter(id => id.startsWith(m + '/')).length >= 3) completedModules++ })
        if (p.certificateEarnedAt) { certificates++; if (programId === 'teacher-wellbeing') wellbeingProgram = true }
      }
    }
  } catch {}

  // Journal
  let journalEntries = 0
  try {
    const raw = localStorage.getItem('mwalimu_journal')
    if (raw) journalEntries = (JSON.parse(raw) as unknown[]).length
  } catch {}

  // Community posts by current user
  let communityPosts = 0
  try {
    const profileRaw = localStorage.getItem('mwalimu_profile')
    const profile = profileRaw ? JSON.parse(profileRaw) as { name?: string } : null
    const communityRaw = localStorage.getItem('mwalimu_community')
    if (communityRaw && profile?.name) {
      const posts = JSON.parse(communityRaw) as Array<{ author: string }>
      communityPosts = posts.filter(p => p.author === profile.name).length
    }
  } catch {}

  // Tools used
  const toolsUsed = getToolsUsedCount()

  // Action research usage
  let actionResearch = false
  try {
    const raw = localStorage.getItem('mwalimu_tools_used')
    if (raw) actionResearch = (JSON.parse(raw) as string[]).includes('action-research')
  } catch {}

  // Kiswahili usage
  let usedSwahili = false
  try {
    usedSwahili = localStorage.getItem('mwalimu_lang') === 'sw'
  } catch {}

  const streak = getStreak()

  return { completedLessons, completedModules, certificates, journalEntries, communityPosts, toolsUsed, actionResearch, wellbeingProgram, usedSwahili, streak }
}
