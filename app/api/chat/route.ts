import { streamText, convertToModelMessages } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'

const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

// Ollama runs locally — OpenAI-compatible API on port 11434
const ollama = createOpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
})

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'gemma2:2b'

const systemPrompt = `You are Mwalimu AI, an expert professional development coach for Kenyan teachers implementing Competency-Based Curriculum (CBC).

You are knowledgeable about:
- CBC fundamentals and implementation strategies
- Competency-based assessment techniques
- Formative assessment methods
- Inclusive teaching practices for diverse learners
- Digital integration in classrooms
- Teacher professional development best practices
- Kenyan education context and curriculum requirements

Your role is to:
1. Provide personalized guidance based on the teacher's experience level and needs
2. Offer practical, classroom-ready strategies and examples
3. Help troubleshoot specific teaching challenges
4. Suggest resources and activities aligned with CBC
5. Encourage reflective practice and continuous improvement
6. Be empathetic to the challenges of teaching in Kenya's context

Always be supportive, practical, and encouraging. Reference real classroom scenarios when possible.`

async function isOllamaAvailable(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags', {
      signal: AbortSignal.timeout(1500),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const converted = await convertToModelMessages(messages)

  // Try Gemini (online) first
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const result = streamText({
        model: gemini('gemini-2.0-flash-lite'),
        system: systemPrompt,
        messages: converted,
        temperature: 0.7,
        maxOutputTokens: 1000,
        maxRetries: 0,
      })
      const response = result.toUIMessageStreamResponse()
      // Tag which backend served this request
      response.headers.set('X-AI-Backend', 'gemini')
      return response
    } catch {
      // Gemini failed (quota, network, etc.) — fall through to Ollama
    }
  }

  // Fall back to local Ollama
  const ollamaUp = await isOllamaAvailable()
  if (!ollamaUp) {
    return Response.json(
      {
        error:
          'No AI backend available. Online: add GOOGLE_GENERATIVE_AI_API_KEY to .env.local. ' +
          'Offline: install Ollama from https://ollama.com and run: ollama pull gemma2:2b',
      },
      { status: 503 }
    )
  }

  const result = streamText({
    model: ollama(OLLAMA_MODEL),
    system: systemPrompt,
    messages: converted,
    temperature: 0.7,
    maxOutputTokens: 1000,
    maxRetries: 0,
  })
  const response = result.toUIMessageStreamResponse()
  response.headers.set('X-AI-Backend', 'ollama')
  return response
}
