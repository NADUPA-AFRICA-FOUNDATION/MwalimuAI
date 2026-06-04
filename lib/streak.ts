// Streak tracking and badge computation
// Primary: localStorage for instant reads.
// Cloud: Supabase activity_log table — synced on login and on each new activity.

import { createClient } from '@/lib/supabase/client'

const ACTIVITY_KEY = 'mwalimu_activity'
const TOOLS_KEY    = 'mwalimu_tools_used'

export type ActivityType = 'lesson' | 'tool' | 'journal' | 'community' | 'login' | 'assessment'

interface ActivityEntry {
  date: string   // YYYY-MM-DD
  type: ActivityType
}

function todayStr(): string {
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

export function recordActivity(type: ActivityType, userId?: string) {
  if (typeof window === 'undefined') return
  const entries = loadActivity()
  const d = todayStr()
  if (!entries.some(e => e.date === d && e.type === type)) {
    entries.push({ date: d, type })
    saveActivity(entries)
  }
  // Sync to Supabase fire-and-forget
  if (userId) {
    const supabase = createClient()
    supabase
      .from('activity_log')
      .upsert({ user_id: userId, date: d, type }, { onConflict: 'user_id,date,type' })
      .then(() => {}, () => {})
  }
}

/**
 * Pull activity from Supabase into localStorage so streak is accurate on new devices.
 * Called once after sign-in.
 */
export async function syncActivityFromSupabase(userId: string): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('activity_log')
      .select('date, type')
      .eq('user_id', userId)

    if (!data) return
    const local = loadActivity()
    const merged = [...local]
    for (const row of data) {
      if (!merged.some(e => e.date === row.date && e.type === row.type)) {
        merged.push({ date: row.date, type: row.type as ActivityType })
      }
    }
    saveActivity(merged)
  } catch {}
}

export function recordToolUsed(toolId: string, userId?: string) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(TOOLS_KEY)
    const used: string[] = raw ? JSON.parse(raw) : []
    if (!used.includes(toolId)) {
      used.push(toolId)
      localStorage.setItem(TOOLS_KEY, JSON.stringify(used))
    }
  } catch {}
  if (userId) {
    const supabase = createClient()
    supabase
      .from('tools_used')
      .upsert({ user_id: userId, tool_id: toolId }, { onConflict: 'user_id,tool_id' })
      .then(() => {}, () => {})
  }
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
  weekDays:  boolean[]
}

export function getStreak(): StreakData {
  const entries = loadActivity()
  if (entries.length === 0) return { current: 0, longest: 0, totalDays: 0, weekDays: Array(7).fill(false) }

  const dates    = [...new Set(entries.map(e => e.date))].sort()
  const totalDays = dates.length
  const msPerDay  = 86_400_000
  const todayMs   = new Date(todayStr()).getTime()

  // Current streak — walk back from today
  let current = 0
  for (let offset = 0; offset < 365; offset++) {
    const checkDate = new Date(todayMs - offset * msPerDay).toISOString().slice(0, 10)
    if (dates.includes(checkDate)) {
      current++
    } else if (offset === 0) {
      continue // no activity today yet — check yesterday before breaking
    } else {
      break
    }
  }

  // Longest streak
  let longest = 0, run = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]).getTime()
    const curr = new Date(dates[i]).getTime()
    if (Math.round((curr - prev) / msPerDay) === 1) { run++; longest = Math.max(longest, run) }
    else run = 1
  }
  longest = Math.max(longest, run, current)

  // weekDays[0] = today, [6] = 6 days ago
  const weekDays: boolean[] = Array(7).fill(false)
  for (let i = 0; i < 7; i++) {
    weekDays[i] = dates.includes(new Date(todayMs - i * msPerDay).toISOString().slice(0, 10))
  }

  return { current, longest, totalDays, weekDays }
}

// ── Badge definitions & computation ─────────────────────────

export interface BadgeDef {
  id:    string
  name:  string
  desc:  string
  icon:  string
  color: string
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: 'first-lesson',    name: 'First Step',         desc: 'Completed your first lesson',             icon: 'BookOpen',      color: 'blue'   },
  { id: 'module-master',   name: 'Module Master',       desc: 'Completed a full module (3 lessons)',     icon: 'BookMarked',    color: 'purple' },
  { id: 'program-grad',    name: 'Program Graduate',    desc: 'Earned your first certificate',           icon: 'GraduationCap', color: 'amber'  },
  { id: 'week-warrior',    name: 'Week Warrior',        desc: '7-day learning streak',                   icon: 'Flame',         color: 'orange' },
  { id: 'month-learner',   name: 'Dedicated Learner',   desc: '30 total days of learning activity',      icon: 'Calendar',      color: 'green'  },
  { id: 'reflective',      name: 'Reflective Teacher',  desc: 'Wrote 5 journal entries',                 icon: 'PenLine',       color: 'pink'   },
  { id: 'community-voice', name: 'Community Voice',     desc: 'Posted in the teacher community',         icon: 'Users',         color: 'teal'   },
  { id: 'tool-ninja',      name: 'Tool Ninja',          desc: 'Used 4 different AI teacher tools',       icon: 'Wand2',         color: 'violet' },
  { id: 'researcher',      name: 'Action Researcher',   desc: 'Completed the Action Research guide',     icon: 'FlaskConical',  color: 'cyan'   },
  { id: 'wellbeing-champ', name: 'Wellness Champion',   desc: 'Completed the Teacher Wellbeing program', icon: 'Heart',         color: 'rose'   },
  { id: 'kiswahili',       name: 'Lugha Mbili',         desc: 'Used the Kiswahili mode',                 icon: 'Globe',         color: 'emerald'},
  { id: 'early-adopter',   name: 'Early Adopter',       desc: '10+ days of learning activity',           icon: 'Star',          color: 'yellow' },
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
  if (input.completedModules  >= 1)  earned.add('module-master')
  if (input.certificates      >= 1)  earned.add('program-grad')
  if (input.streak.current    >= 7)  earned.add('week-warrior')
  if (input.streak.totalDays  >= 30) earned.add('month-learner')
  if (input.journalEntries    >= 5)  earned.add('reflective')
  if (input.communityPosts    >= 1)  earned.add('community-voice')
  if (input.toolsUsed         >= 4)  earned.add('tool-ninja')
  if (input.actionResearch)          earned.add('researcher')
  if (input.wellbeingProgram)        earned.add('wellbeing-champ')
  if (input.usedSwahili)             earned.add('kiswahili')
  if (input.streak.totalDays  >= 10) earned.add('early-adopter')
  return BADGE_DEFS.map(b => ({ ...b, earned: earned.has(b.id) }))
}

export function getBadgeInput(): BadgeInput {
  if (typeof window === 'undefined') {
    return { completedLessons: 0, completedModules: 0, certificates: 0, journalEntries: 0, communityPosts: 0, toolsUsed: 0, actionResearch: false, wellbeingProgram: false, usedSwahili: false, streak: { current: 0, longest: 0, totalDays: 0, weekDays: Array(7).fill(false) } }
  }

  let completedLessons = 0, completedModules = 0, certificates = 0, wellbeingProgram = false
  try {
    const raw = localStorage.getItem('mwalimu_learning_progress')
    if (raw) {
      const all = JSON.parse(raw) as Record<string, { completedLessons: string[]; certificateEarnedAt?: string }>
      for (const [programId, p] of Object.entries(all)) {
        completedLessons += p.completedLessons?.length ?? 0
        const modules = new Set(p.completedLessons?.map(id => id.split('/')[0]) ?? [])
        modules.forEach(m => { if ((p.completedLessons?.filter(id => id.startsWith(m + '/')).length ?? 0) >= 3) completedModules++ })
        if (p.certificateEarnedAt) { certificates++; if (programId === 'teacher-wellbeing') wellbeingProgram = true }
      }
    }
  } catch {}

  let journalEntries = 0
  try {
    const raw = localStorage.getItem('mwalimu_journal')
    if (raw) journalEntries = (JSON.parse(raw) as unknown[]).length
  } catch {}

  let communityPosts = 0
  try {
    const profileRaw   = localStorage.getItem('mwalimu_profile')
    const communityRaw = localStorage.getItem('mwalimu_community')
    const profile = profileRaw ? JSON.parse(profileRaw) as { name?: string } : null
    if (communityRaw && profile?.name) {
      communityPosts = (JSON.parse(communityRaw) as Array<{ author: string }>)
        .filter(p => p.author === profile.name).length
    }
  } catch {}

  const toolsUsed = getToolsUsedCount()

  let actionResearch = false
  try {
    const raw = localStorage.getItem(TOOLS_KEY)
    if (raw) actionResearch = (JSON.parse(raw) as string[]).includes('action-research')
  } catch {}

  let usedSwahili = false
  try { usedSwahili = localStorage.getItem('mwalimu_lang') === 'sw' } catch {}

  return { completedLessons, completedModules, certificates, journalEntries, communityPosts, toolsUsed, actionResearch, wellbeingProgram, usedSwahili, streak: getStreak() }
}
