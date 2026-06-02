import type { Program } from './learning-paths-data'

const KEY = 'mwalimu_learning_progress'
const DISC_KEY = 'mwalimu_discussions'

export interface DiscussionPost {
  id: string
  author: string
  content: string
  timestamp: string
  isOwn: boolean
}

export interface ProgramProgress {
  completedLessons: string[]           // `${moduleId}/${lessonId}`
  reflections: Record<string, string>  // key: `${moduleId}/${lessonId}`
  preAssessment?: { score: number; total: number; date: string; answers: number[] }
  postAssessment?: { score: number; total: number; date: string; answers: number[] }
  assignment?: { text: string; feedback: string; submittedAt: string }
  certificateEarnedAt?: string
  cohortJoined?: boolean
}

export type AllProgress = Record<string, ProgramProgress>

function read(): AllProgress {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} }
}

function write(data: AllProgress) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
}

export function getProgress(programId: string): ProgramProgress {
  return read()[programId] ?? { completedLessons: [], reflections: {} }
}

export function completeLesson(programId: string, moduleId: string, lessonId: string) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  const key = `${moduleId}/${lessonId}`
  if (!p.completedLessons.includes(key)) p.completedLessons = [...p.completedLessons, key]
  all[programId] = p
  write(all)
}

export function saveReflection(programId: string, moduleId: string, lessonId: string, text: string) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  p.reflections[`${moduleId}/${lessonId}`] = text
  all[programId] = p
  write(all)
}

export function saveAssessment(
  programId: string,
  type: 'preAssessment' | 'postAssessment',
  score: number, total: number, answers: number[]
) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  p[type] = { score, total, date: new Date().toLocaleDateString(), answers }
  all[programId] = p
  write(all)
}

export function saveAssignment(programId: string, text: string, feedback: string) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  p.assignment = { text, feedback, submittedAt: new Date().toLocaleDateString() }
  all[programId] = p
  write(all)
}

export function earnCertificate(programId: string) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  if (!p.certificateEarnedAt) {
    p.certificateEarnedAt = new Date().toLocaleDateString()
  }
  all[programId] = p
  write(all)
}

export function joinCohort(programId: string) {
  const all = read()
  const p = all[programId] ?? { completedLessons: [], reflections: {} }
  p.cohortJoined = true
  all[programId] = p
  write(all)
}

export function isLessonComplete(progress: ProgramProgress, moduleId: string, lessonId: string) {
  return progress.completedLessons.includes(`${moduleId}/${lessonId}`)
}

export function getProgramCompletionPct(program: Program, progress: ProgramProgress): number {
  const total = program.modules.reduce((s, m) => s + m.lessons.length, 0)
  if (total === 0) return 0
  return Math.round((progress.completedLessons.length / total) * 100)
}

export function isProgramComplete(program: Program, progress: ProgramProgress): boolean {
  const total = program.modules.reduce((s, m) => s + m.lessons.length, 0)
  return progress.completedLessons.length >= total && !!progress.postAssessment
}

/* ── Discussion helpers ──────────────────────────────────── */
type AllDiscussions = Record<string, DiscussionPost[]>

function readDisc(): AllDiscussions {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(DISC_KEY) ?? '{}') } catch { return {} }
}

function writeDisc(data: AllDiscussions) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(DISC_KEY, JSON.stringify(data)) } catch {}
}

const SEED_POSTS: Record<string, { author: string; content: string }[]> = {
  default: [
    { author: 'Mary Wanjiku, Kiambu',    content: 'This lesson really clicked for me — I\'ve been trying to apply this in my Grade 5 class and the learners are so much more engaged. Has anyone else noticed the same?' },
    { author: 'Samuel Ochieng, Kisumu',  content: 'I had a question about this topic. How do you handle it when some learners are way ahead and others are still catching up? I\'d love to hear different approaches.' },
  ],
}

function uid() { return Math.random().toString(36).slice(2, 9) }

export function getDiscussions(programId: string, moduleId: string, lessonId: string): DiscussionPost[] {
  const all = readDisc()
  const key = `${programId}/${moduleId}/${lessonId}`
  if (!all[key]) {
    const seeds = SEED_POSTS.default.map((s, i) => ({
      id: `seed-${i}`,
      author: s.author,
      content: s.content,
      timestamp: new Date(Date.now() - (2 - i) * 86400000 * 2).toLocaleDateString(),
      isOwn: false,
    }))
    all[key] = seeds
    writeDisc(all)
  }
  return all[key]
}

export function addDiscussionPost(
  programId: string, moduleId: string, lessonId: string,
  content: string, authorName: string
): DiscussionPost {
  const all = readDisc()
  const key = `${programId}/${moduleId}/${lessonId}`
  const post: DiscussionPost = {
    id: uid(), author: authorName, content,
    timestamp: new Date().toLocaleDateString(), isOwn: true,
  }
  all[key] = [...(all[key] ?? []), post]
  writeDisc(all)
  return post
}

/* ── Peer review sample data ─────────────────────────────── */
export const PEER_SUBMISSIONS = [
  {
    id: 'peer-1',
    author: 'Faith Kemunto, Nyamira',
    submittedAt: '3 days ago',
    preview: 'In my Grade 6 class, I decided to redesign my mathematics lesson on fractions to be more learner-centred. Instead of explaining the concept on the board, I gave each group a piece of paper to fold and cut...',
    full: 'In my Grade 6 class, I decided to redesign my mathematics lesson on fractions to be more learner-centred. Instead of explaining the concept on the board, I gave each group a piece of paper to fold and cut into equal parts. They discovered that folding in half gives 1/2, into quarters gives 1/4, and so on. The discussion that followed was incredible — learners were making connections I hadn\'t anticipated. The challenge I faced was time management; the activity took longer than planned. Next time, I\'ll prepare a simpler recording sheet to help groups move faster.',
    feedback: '',
  },
  {
    id: 'peer-2',
    author: 'Peter Mwangi, Murang\'a',
    submittedAt: '1 week ago',
    preview: 'My reflection focuses on how I communicate CBC to parents who are concerned about examination preparation. In our school community, many parents still equate good education with exercise books and regular tests...',
    full: 'My reflection focuses on how I communicate CBC to parents who are concerned about examination preparation. In our school community, many parents still equate good education with exercise books and regular tests. After this program, I prepared a short presentation for parents explaining that CBC does not abandon rigour — it redefines what rigour looks like. I showed them a portfolio piece from one of our best-performing learners alongside her observation records. The response was more positive than I expected.',
    feedback: '',
  },
]
