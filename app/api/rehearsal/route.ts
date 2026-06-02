import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})
const ollama = createOpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
})
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'gemma2:2b'

let groqFailedAt = 0
const GROQ_COOLDOWN_MS = 60_000
function markGroqFailed() { groqFailedAt = Date.now() }
function groqOnCooldown() { return Date.now() - groqFailedAt < GROQ_COOLDOWN_MS }

async function isOllamaAvailable(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags', { signal: AbortSignal.timeout(1500) })
    if (!res.ok) return false
    const { models } = (await res.json()) as { models: Array<{ name: string }> }
    const base = OLLAMA_MODEL.split(':')[0]
    return Array.isArray(models) && models.some(m => m.name === OLLAMA_MODEL || m.name.startsWith(base + ':') || m.name === base)
  } catch { return false }
}

function buildSystem(lessonPlan: string, grade: string, lang?: string) {
  const langInstruction = lang === 'sw'
    ? 'IMPORTANT: Simulate the class responses in Kiswahili. The teacher may also respond in Kiswahili.\n\n'
    : ''

  return `${langInstruction}You are simulating a lively class of ${grade} learners in a Kenyan CBC classroom.

The teacher has shared this lesson plan:
---
${lessonPlan}
---

Your role:
- Play the entire class as a group, not a single student
- After each teacher message, respond as the class would: mix of questions, confusion, enthusiasm, off-task comments, short answers, cheeky remarks
- Represent different learner types: the eager learner who always raises a hand, the confused one who asks "But teacher, I don't understand...", the quiet one who only speaks when called upon, the distracted one, the one who gives a surprisingly deep answer
- Keep responses natural and age-appropriate for ${grade} Kenyan learners
- Use Kenyan classroom language naturally (e.g. "Sawa teacher", "Yes teacher!", "Eh?", "I know I know!", "Teacher teacher teacher!")
- After 3-4 exchanges, include one simulated disruption or unexpected situation (a learner says something off-topic, two students start arguing quietly, someone asks to go to the bathroom at a key moment)
- Keep each response to 4–8 lines — a realistic classroom snapshot, not a novel

Start: When the teacher sends their first message (usually introducing the topic), respond as the class arriving, settling in, and reacting to the opening.`
}

export async function POST(req: Request) {
  const { messages, lessonPlan, grade, lang } = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
    lessonPlan: string
    grade: string
    lang?: string
  }

  const system = buildSystem(lessonPlan ?? '', grade ?? 'Grade 4', lang)

  const canUseGroq = process.env.GROQ_API_KEY && !groqOnCooldown()

  if (canUseGroq) {
    const result = streamText({
      model: groq(GROQ_MODEL),
      system,
      messages,
      temperature: 0.85,
      maxOutputTokens: 400,
      maxRetries: 0,
      onError({ error }: { error: unknown }) {
        const msg = String(error)
        if (msg.includes('429') || msg.includes('rate_limit') || msg.includes('TooManyRequests')) markGroqFailed()
      },
    })
    const response = result.toTextStreamResponse()
    response.headers.set('X-AI-Backend', 'groq')
    return response
  }

  const ollamaUp = await isOllamaAvailable()
  if (!ollamaUp) {
    return Response.json({ error: 'No AI backend available. Add GROQ_API_KEY to .env.local.' }, { status: 503 })
  }

  const result = streamText({
    model: ollama(OLLAMA_MODEL),
    system,
    messages,
    temperature: 0.85,
    maxOutputTokens: 400,
    maxRetries: 0,
  })
  const response = result.toTextStreamResponse()
  response.headers.set('X-AI-Backend', 'ollama')
  return response
}
