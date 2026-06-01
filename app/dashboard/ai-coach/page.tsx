'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BackButton } from '@/components/back-button'
import { Send, Lightbulb } from 'lucide-react'

const suggestedQuestions = [
  'How do I implement formative assessment in my CBC classroom?',
  'What strategies work best for diverse learners?',
  'How can I integrate technology into my teaching?',
  'Tell me about competency-based grading',
]

export default function AICoachjPage() {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)

  const { messages, isLoading, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  const handleSendMessage = (text: string = input) => {
    if (text.trim()) {
      sendMessage({ text })
      setInput('')
      setShowSuggestions(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="p-4 md:px-8 md:pt-4 pb-0">
        <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Your AI Coach</h1>
            <p className="text-muted-foreground max-w-md mb-8">
              Get personalized guidance on CBC implementation, assessment strategies, and teaching techniques. Ask me anything about professional development.
            </p>

            {showSuggestions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(question)}
                    className="text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl px-4 py-3 rounded-lg whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.parts
                    ? message.parts
                        .filter((p: { type: string }) => p.type === 'text')
                        .map((p: { type: string; text: string }) => p.text)
                        .join('')
                    : message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ delay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ delay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Chat Input */}
      <Card className="m-4 md:m-8 p-4 border-t-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask your AI coach..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </Card>
    </div>
  )
}
