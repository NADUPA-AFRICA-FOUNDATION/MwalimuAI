'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { useProfile } from '@/context/profile-context'
import {
  Users, Send, RefreshCw, AlertCircle, ChevronRight, Play, RotateCcw,
} from 'lucide-react'

const GRADES = ['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9']

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function LessonRehearsalPage() {
  const { lang } = useProfile()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [lessonPlan, setLessonPlan] = useState('')
  const [grade, setGrade]           = useState('Grade 4')
  const [phase, setPhase]           = useState<'setup' | 'chat'>('setup')
  const [messages, setMessages]     = useState<Message[]>([])
  const [input, setInput]           = useState('')
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentText])

  const startRehearsal = async () => {
    if (!lessonPlan.trim()) return
    setPhase('chat')
    // Kick off the class with an opening teacher message
    const opener = `Good morning class! Today we are going to learn about ${lessonPlan.split('\n')[0].slice(0, 80)}. Please sit down and get ready.`
    await sendMessage(opener, [])
  }

  const sendMessage = async (text: string, history: Message[]) => {
    const userMsg: Message = { role: 'user', content: text }
    const newHistory = [...history, userMsg]
    setMessages(newHistory)
    setInput('')
    setIsLoading(true)
    setError(null)
    setCurrentText('')

    try {
      const res = await fetch('/api/rehearsal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory, lessonPlan, grade, lang }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? `Error ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No stream')
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        full += chunk
        setCurrentText(full)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setCurrentText('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage(text, messages)
  }

  const reset = () => {
    setPhase('setup')
    setMessages([])
    setCurrentText('')
    setError(null)
  }

  if (phase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <BackButton fallbackHref="/dashboard/tools" label="Back to Teacher Tools" />
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Lesson Rehearsal</h1>
              <p className="text-sm text-muted-foreground">Practice teaching with an AI class before the real lesson</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Paste your lesson plan, select the grade, then click <strong>Begin Rehearsal</strong>.
              The AI will simulate a real class — asking questions, showing confusion, getting distracted.
              Practice your responses before the real thing.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Grade *</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Your Lesson Plan *</Label>
            <Textarea
              placeholder="Paste your lesson plan here — topic, objectives, activities, assessment methods..."
              value={lessonPlan}
              onChange={e => setLessonPlan(e.target.value)}
              className="rounded-xl resize-none min-h-[200px] text-sm"
              rows={10}
            />
            <p className="text-xs text-muted-foreground">
              The more detail you provide, the more realistic the simulation.
            </p>
          </div>

          <Button
            onClick={startRehearsal}
            disabled={lessonPlan.trim().length < 30}
            className="w-full rounded-xl gap-2 font-semibold"
            size="lg"
          >
            <Play className="w-4 h-4" /> Begin Rehearsal
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
      {/* Header */}
      <div className="shrink-0 px-1 pt-1 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-none">Rehearsal — {grade}</p>
            <p className="text-xs text-muted-foreground mt-0.5">AI is playing your class</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={reset} className="rounded-xl gap-1.5 text-xs">
          <RotateCcw className="w-3.5 h-3.5" /> New Rehearsal
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mr-2 mt-1">
                <Users className="w-3.5 h-3.5 text-accent" />
              </div>
            )}
            <div className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : 'bg-muted text-foreground rounded-tl-sm'
            }`}>
              {msg.role === 'assistant' && (
                <p className="text-[10px] font-semibold text-accent/70 uppercase tracking-wide mb-1">Class response</p>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {currentText && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mr-2 mt-1">
              <Users className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="max-w-lg px-4 py-3 bg-muted rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap">
              <p className="text-[10px] font-semibold text-accent/70 uppercase tracking-wide mb-1">Class response</p>
              {currentText}
              <span className="inline-block w-2 h-4 bg-accent/50 rounded-sm animate-pulse ml-0.5 align-middle" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/25 text-destructive px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /><span>{error}</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border/50 bg-background/80 backdrop-blur-md pt-3 pb-1">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="What you say to the class next…"
            disabled={isLoading}
            rows={2}
            className="flex-1 rounded-xl resize-none text-sm"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="rounded-xl px-4 self-end">
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
