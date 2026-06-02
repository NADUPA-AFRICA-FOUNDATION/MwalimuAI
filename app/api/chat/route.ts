import { streamText, convertToModelMessages } from 'ai'
import { google } from '@ai-sdk/google'

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

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: 'AI service not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to .env.local' },
      { status: 503 }
    )
  }

  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 1000,
    maxRetries: 0, // fail fast — retrying quota errors wastes time
  })

  return result.toUIMessageStreamResponse()
}
