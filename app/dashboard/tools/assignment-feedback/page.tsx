'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { useProfile } from '@/context/profile-context'
import {
  ClipboardCheck, Wand2, RefreshCw, Copy, Check, AlertCircle, Printer,
} from 'lucide-react'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { printPDF } from '@/lib/print-pdf'

const WORK_TYPES = [
  'Lesson Plan',
  'Reflective Journal Entry',
  'Unit Plan',
  'Assessment Design',
  'Differentiation Strategy',
  'Parent Communication',
  'Action Research Proposal',
]

export default function AssignmentFeedbackPage() {
  const { lang } = useProfile()
  const outputRef = useRef<HTMLDivElement>(null)

  const [workType, setWorkType] = useState('Lesson Plan')
  const [submission, setSubmission] = useState('')
  const [output, setOutput]         = useState('')
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [copied, setCopied]         = useState(false)

  const wordCount = submission.trim().split(/\s+/).filter(Boolean).length

  const generate = async () => {
    if (!submission.trim()) return
    setIsLoading(true)
    setOutput('')
    setError(null)

    const prompt = `Work Type: ${workType}\n\nSubmission:\n${submission}`

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'assignment-feedback', prompt, lang }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? `Error ${res.status}`)
      }
      const reader = res.body?.getReader()
      if (!reader) throw new Error('No stream')
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setOutput(prev => prev + decoder.decode(value, { stream: true }))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed')
    } finally {
      setIsLoading(false)
    }
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const printOutput = () => printPDF({
    title:   `CBC Feedback: ${workType}`,
    meta:    `${wordCount} words reviewed`,
    content: output,
    type:    'feedback',
  })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <BackButton fallbackHref="/dashboard/tools" label="Back to Teacher Tools" />
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Assignment Feedback</h1>
            <p className="text-sm text-muted-foreground">AI reviews your work against CBC professional standards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="glass rounded-2xl p-6 space-y-4 h-fit">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Your Work</h2>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Type of Work *</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORK_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Paste Your {workType} *</Label>
              <span className="text-xs text-muted-foreground">{wordCount} words</span>
            </div>
            <Textarea
              placeholder={`Paste your ${workType.toLowerCase()} here for CBC-aligned feedback…`}
              value={submission}
              onChange={e => setSubmission(e.target.value)}
              className="rounded-xl resize-none min-h-[240px] text-sm"
              rows={12}
            />
          </div>

          <Button
            onClick={generate}
            disabled={wordCount < 30 || isLoading}
            className="w-full rounded-xl gap-2 font-semibold"
            size="lg"
          >
            {isLoading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Reviewing…</>
            ) : (
              <><Wand2 className="w-4 h-4" /> Get CBC Feedback</>
            )}
          </Button>
          {wordCount > 0 && wordCount < 30 && (
            <p className="text-xs text-muted-foreground text-center">Add at least 30 words to get feedback</p>
          )}
        </div>

        {/* Output */}
        <div ref={outputRef} className="glass rounded-2xl p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">CBC Feedback</h2>
            {output && (
              <div className="flex gap-1.5">
                <Button variant="ghost" size="sm" onClick={printOutput} className="rounded-xl gap-1.5 text-xs">
                  <Printer className="w-3.5 h-3.5" /> Print
                </Button>
                <Button variant="ghost" size="sm" onClick={copyOutput} className="rounded-xl gap-1.5 text-xs">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </Button>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/25 text-destructive px-4 py-3 rounded-xl text-sm mb-4">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /><span>{error}</span>
            </div>
          )}

          {!output && !isLoading && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
              <ClipboardCheck className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm">Paste your work and click<br /><span className="font-medium">Get CBC Feedback</span></p>
              <p className="text-xs mt-2 opacity-70">Scored against 5 CBC professional dimensions</p>
            </div>
          )}

          {(output || isLoading) && (
            <div className="flex-1 overflow-y-auto">
              <MarkdownRenderer content={output} />
              {isLoading && (
                <span className="inline-block w-2 h-4 bg-primary/60 rounded-sm animate-pulse mt-1 align-middle" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
