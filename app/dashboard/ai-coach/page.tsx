'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BackButton } from '@/components/back-button'
import { Send, Lightbulb, AlertCircle, RefreshCw, Wifi, WifiOff, Cpu } from 'lucide-react'

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

type Backend = 'groq' | 'ollama' | null

export default function AICoachPage() {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [backend, setBackend] = useState<Backend>(null)
  const [isOnline, setIsOnline] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const up   = () => setIsOnline(true)
    const down = () => setIsOnline(false)
    window.addEventListener('online',  up)
    window.addEventListener('offline', down)
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down) }
  }, [])

  const { messages, status, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      // Capture which backend responded via response header
      fetch: async (url, init) => {
        const res = await fetch(url, init as RequestInit)
        const b = res.headers.get('X-AI-Backend') as Backend
        if (b) setBackend(b)
        return res
      },
    }),
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

  const errorMessage = (() => {
    if (!error) return null
    const msg = error.message
    if (msg.includes('not configured') || msg.includes('503'))
      return 'AI service not configured — add GROQ_API_KEY to .env.local and restart the server, or set up Ollama for offline use.'
    if (msg.includes('quota') || msg.includes('rate_limit') || msg.includes('rate limit'))
      return 'Online quota exceeded. If Ollama is installed and running, the next message will use it automatically.'
    if (msg.includes('Ollama') || msg.includes('11434') || msg.includes('No AI backend'))
      return 'No AI backend available. Online: check your API key. Offline: install Ollama (ollama.com) and run: ollama pull gemma2:2b'
    if (msg.includes('API_KEY') || msg.includes('401'))
      return 'Invalid API key — check GOOGLE_GENERATIVE_AI_API_KEY in .env.local.'
    return `Something went wrong: ${msg}`
  })()

  return (
    <div className="flex flex-col bg-background" style={{ height: 'calc(100vh - 57px)' }}>

      {/* Back nav + status bar */}
      <div className="px-4 md:px-8 pt-4 pb-2 shrink-0 flex items-center justify-between">
        <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />

        {/* Backend indicator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {backend === 'groq' && (
            <>
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium">Groq (online)</span>
            </>
          )}
          {backend === 'ollama' && (
            <>
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-medium">Ollama (local)</span>
            </>
          )}
          {!backend && (
            <>
              {isOnline
                ? <Wifi className="w-3.5 h-3.5" />
                : <WifiOff className="w-3.5 h-3.5 text-destructive" />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </>
          )}
        </div>
      </div>

      {/* Error banner */}
      {errorMessage && (
        <div className="mx-4 md:mx-8 mb-2 flex items-start gap-3 bg-destructive/10 border border-destructive/25 text-destructive px-4 py-3 rounded-xl text-sm shrink-0">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="flex-1">{errorMessage}</span>
        </div>
      )}

      {/* Offline notice when no messages yet */}
      {!isOnline && messages.length === 0 && backend !== 'ollama' && (
        <div className="mx-4 md:mx-8 mb-2 flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm shrink-0">
          <WifiOff className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            You&apos;re offline. Messages will use your local Ollama model if it&apos;s running.{' '}
            <span className="font-medium">Setup: install Ollama → run <code className="bg-amber-100 px-1 rounded">ollama pull gemma2:2b</code></span>
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
              techniques. Works online via Gemini and offline via Ollama.
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
              onClick={() => handleSend(
                messages.findLast(m => m.role === 'user')
                  ?.parts?.find((p): p is { type: 'text'; text: string } => p.type === 'text')
                  ?.text ?? ''
              )}
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
            placeholder={isOnline ? 'Ask your AI coach anything about CBC…' : 'Offline — using local Ollama model…'}
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
