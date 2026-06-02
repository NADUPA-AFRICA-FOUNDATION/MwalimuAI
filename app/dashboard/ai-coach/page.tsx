'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BackButton } from '@/components/back-button'
import { Send, Lightbulb, AlertCircle, RefreshCw } from 'lucide-react'

const suggestedQuestions = [
  'How do I implement formative assessment in my CBC classroom?',
  'What strategies work best for diverse learners?',
  'How can I integrate technology into my teaching?',
  'Tell me about competency-based grading',
]

function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center py-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 120}ms`, animationDuration: '900ms' }}
        />
      ))}
    </div>
  )
}

export default function AICoachPage() {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, status, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = (text: string = input) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    sendMessage({ text: trimmed })
    setInput('')
    setShowSuggestions(false)
  }

  return (
    <div className="flex flex-col bg-background" style={{ height: 'calc(100vh - 57px)' }}>

      {/* Back nav */}
      <div className="px-4 md:px-8 pt-4 pb-2 shrink-0">
        <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 md:mx-8 mb-2 flex items-start gap-3 bg-destructive/10 border border-destructive/25 text-destructive px-4 py-3 rounded-xl text-sm shrink-0">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="flex-1">
            {error.message.includes('not configured')
              ? 'AI service not configured — add GOOGLE_GENERATIVE_AI_API_KEY to .env.local and restart the server.'
              : error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')
              ? 'API quota exceeded. Your free-tier limit has been reached — wait a minute and try again, or upgrade your Google AI plan at aistudio.google.com.'
              : error.message.includes('API_KEY') || error.message.includes('401')
              ? 'Invalid API key — check GOOGLE_GENERATIVE_AI_API_KEY in .env.local.'
              : `Something went wrong: ${error.message}`}
          </span>
        </div>
      )}

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center pb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight">Your AI Coach</h1>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed text-sm">
              Get personalized guidance on CBC implementation, assessment strategies, and teaching
              techniques. Ask me anything about professional development.
            </p>

            {showSuggestions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-sm text-muted-foreground hover:text-foreground group"
                  >
                    <span className="text-primary text-xs font-semibold mr-1.5 group-hover:text-primary">→</span>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, idx) => {
              const textContent = message.parts
                ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                .map(p => p.text)
                .join('') ?? ''

              return (
                <div
                  key={message.id ?? idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mr-2 mt-1">
                      <Lightbulb className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted text-foreground rounded-tl-sm'
                    }`}
                  >
                    {textContent}
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex justify-start items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Lightbulb className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-tl-sm">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-8 py-4">
        {error && (
          <div className="flex justify-end mb-2">
            <button
              onClick={() => sendMessage({ text: messages[messages.length - 1]?.parts?.find((p): p is { type: 'text'; text: string } => p.type === 'text')?.text ?? '' })}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask your AI coach anything about CBC…"
            disabled={isLoading}
            className="flex-1 rounded-xl border-border/60 focus:border-primary/50 bg-background"
          />
          <Button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="rounded-xl gap-2 px-5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
