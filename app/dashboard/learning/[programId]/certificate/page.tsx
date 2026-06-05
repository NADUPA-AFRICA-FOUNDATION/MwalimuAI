'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getProgramById } from '@/lib/learning-paths-data'
import { getProgress, earnCertificate } from '@/lib/learning-progress'
import { useProfile } from '@/context/profile-context'
import { Button } from '@/components/ui/button'
import { BackButton } from '@/components/back-button'
import { Award, Printer, Share2, CheckCircle2, GraduationCap, Lock } from 'lucide-react'

export default function CertificatePage() {
  const params  = useParams<{ programId: string }>()
  const { profile, syncReady } = useProfile()
  const program = getProgramById(params.programId)

  const [progress, setProgress] = useState({ completedLessons: [] as string[], reflections: {} as Record<string, string>, certificateEarnedAt: undefined as string | undefined, postAssessment: undefined as { score: number; total: number } | undefined })
  const [mounted, setMounted]   = useState(false)
  const [shared, setShared]         = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const certRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!program) return
    const p = getProgress(program.id)
    setProgress(p as typeof progress)
    if (p.postAssessment && !p.certificateEarnedAt) {
      earnCertificate(program.id)
      setProgress({ ...p as typeof progress, certificateEarnedAt: new Date().toLocaleDateString() })
    }
    setMounted(true)
  }, [program, syncReady])

  if (!program) return <div className="p-8 text-muted-foreground">Program not found.</div>

  const isUnlocked = mounted && !!progress.postAssessment
  const earnedDate = progress.certificateEarnedAt ?? new Date().toLocaleDateString()
  const teacherName = profile?.name ?? 'Teacher'
  const postScore   = progress.postAssessment ? `${progress.postAssessment.score}/${progress.postAssessment.total}` : null

  const handlePrint = async () => {
    setIsPrinting(true)
    try {
      // Build a self-contained HTML certificate with inline styles so html2canvas
      // doesn't need to resolve CSS custom properties or Tailwind variables.
      const date  = earnedDate
      const score = postScore ?? ''
      const skills = program.certificate.skills

      const skillChips = skills.map(s =>
        `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;background:#edfaf6;color:#0c9a7b;padding:5px 12px;border-radius:999px;font-weight:600;margin:3px;">&#10003; ${s}</span>`
      ).join('')

      const html = `
<div style="width:1122px;height:794px;background:#fff;font-family:-apple-system,'Segoe UI',Arial,sans-serif;position:relative;overflow:hidden;box-sizing:border-box;">
  <!-- outer border rings -->
  <div style="position:absolute;inset:14px;border:2px solid #b6eed8;border-radius:18px;pointer-events:none;"></div>
  <div style="position:absolute;inset:22px;border:1px solid #edfaf6;border-radius:14px;pointer-events:none;"></div>
  <!-- top colour band -->
  <div style="height:8px;background:linear-gradient(90deg,#0c9a7b,#10b981,#0c9a7b);"></div>
  <!-- body -->
  <div style="padding:36px 64px 28px;text-align:center;position:relative;">
    <!-- header row -->
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:22px;">
      <div style="width:50px;height:50px;background:#0c9a7b;border-radius:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(12,154,123,.3);">
        <span style="color:#fff;font-size:24px;font-weight:900;">M</span>
      </div>
      <div style="text-align:left;">
        <div style="font-size:16px;font-weight:800;color:#111;line-height:1.2;">Mwalimu AI</div>
        <div style="font-size:11px;color:#6b7280;">Professional Development Platform</div>
      </div>
    </div>
    <!-- badge -->
    <div style="display:inline-flex;align-items:center;gap:8px;background:#edfaf6;color:#0c9a7b;padding:7px 18px;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:18px;">
      &#127891; Certificate of Completion
    </div>
    <!-- presented to -->
    <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">This is to certify that</p>
    <h1 style="margin:0 0 4px;font-size:38px;font-weight:800;color:#111;font-family:Georgia,serif;letter-spacing:-0.5px;">${teacherName}</h1>
    <p style="margin:0 0 20px;font-size:13px;color:#9ca3af;">has successfully completed the</p>
    <!-- programme name -->
    <div style="border-top:1px solid #b6eed8;border-bottom:1px solid #b6eed8;padding:18px 0;margin-bottom:18px;">
      <div style="font-size:22px;font-weight:800;color:#111;margin-bottom:4px;">${program.title}</div>
      <div style="font-size:13px;color:#0c9a7b;font-weight:600;margin-bottom:4px;">${program.certificate.subtitle}</div>
      <div style="font-size:11px;color:#9ca3af;">${program.kicdAlignment}</div>
    </div>
    <!-- skills -->
    <p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#9ca3af;margin:0 0 8px;">Competencies Demonstrated</p>
    <div style="margin-bottom:18px;">${skillChips}</div>
    ${score ? `<p style="font-size:11px;color:#9ca3af;margin:0 0 16px;">Post-Assessment Score: <strong style="color:#0c9a7b;">${score}</strong></p>` : ''}
    <!-- footer row -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-top:16px;border-top:1px solid #f3f4f6;">
      <div style="text-align:left;">
        <div style="font-size:10px;color:#9ca3af;margin-bottom:2px;">Completed</div>
        <div style="font-size:13px;font-weight:700;color:#374151;">${date}</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:20px;font-weight:800;color:#0c9a7b;font-family:cursive;">Mwalimu AI</div>
        <div style="width:100px;height:1px;background:#d1d5db;margin:4px auto;"></div>
        <div style="font-size:10px;color:#9ca3af;">Authorised Signature</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#9ca3af;margin-bottom:2px;">Duration</div>
        <div style="font-size:13px;font-weight:700;color:#374151;">${program.hours} hours</div>
      </div>
    </div>
  </div>
  <!-- bottom colour band -->
  <div style="position:absolute;bottom:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#10b981,#0c9a7b,#10b981);"></div>
</div>`

      const container = document.createElement('div')
      container.setAttribute('aria-hidden', 'true')
      const docBottom = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.scrollY + window.innerHeight) + 50
      Object.assign(container.style, {
        position: 'absolute', top: `${docBottom}px`, left: '0',
        width: '1122px', background: '#fff', zIndex: '9999',
        pointerEvents: 'none', overflow: 'visible',
      })
      container.innerHTML = html
      document.body.appendChild(container)

      try {
        await document.fonts.ready
        const { default: html2canvas } = await import('html2canvas')
        const { jsPDF }                = await import('jspdf')

        const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
          scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff',
          scrollX: window.scrollX, scrollY: window.scrollY,
        })

        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 297, 210)
        const safeName = (program.title ?? 'Certificate').replace(/[^a-z0-9 ]/gi, '_').slice(0, 60)
        pdf.save(`${safeName}_Certificate.pdf`)
      } finally {
        if (container.parentNode) container.parentNode.removeChild(container)
      }
    } finally {
      setIsPrinting(false)
    }
  }

  const handleShare = async () => {
    const text = `I just completed the ${program.title} program on Mwalimu AI — a CBC professional development platform for Kenyan teachers! 🎓 #MwalimuAI #CBC #KenyanTeachers`
    if (navigator.share) {
      try { await navigator.share({ title: `${program.title} Certificate`, text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      setShared(true)
      setTimeout(() => setShared(false), 3000)
    }
  }

  if (mounted && !isUnlocked) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6"><BackButton fallbackHref={`/dashboard/learning/${program.id}`} label="Back to Program" /></div>
        <div className="glass rounded-2xl p-12 text-center">
          <Lock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Certificate Locked</h1>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
            Complete all lessons and take the post-assessment to earn your certificate.
          </p>
          <Link href={`/dashboard/learning/${program.id}`}>
            <Button className="rounded-xl">Back to Program</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Controls — hidden on print */}
      <div className="mb-6 print:hidden">
        <BackButton fallbackHref={`/dashboard/learning/${program.id}`} label="Back to Program" />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">Your Certificate</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="rounded-xl gap-2">
              <Share2 className="w-4 h-4" />
              {shared ? 'Copied!' : 'Share'}
            </Button>
            <Button size="sm" onClick={handlePrint} disabled={isPrinting} className="rounded-xl gap-2">
              {isPrinting ? 'Generating…' : <><Printer className="w-4 h-4" /> Save as PDF</>}
            </Button>
          </div>
        </div>
      </div>

      {/* Certificate — print target */}
      <div ref={certRef} className="certificate-container">
        <div className="relative bg-white dark:bg-gray-50 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 print:shadow-none print:rounded-none">
          {/* Outer border */}
          <div className="absolute inset-3 rounded-2xl border-2 border-primary/20 pointer-events-none" />
          <div className="absolute inset-4 rounded-xl border border-primary/10 pointer-events-none" />

          {/* Top decoration */}
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="px-10 py-10 text-center relative">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
              <GraduationCap className="w-72 h-72 text-primary" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-gray-900 leading-tight">Mwalimu AI</p>
                <p className="text-xs text-gray-500">Professional Development Platform</p>
              </div>
            </div>

            {/* Certificate title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Certificate of Completion
              </div>
              <p className="text-sm text-gray-500 mb-1">This is to certify that</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {teacherName}
              </h2>
              <p className="text-sm text-gray-500">
                has successfully completed the
              </p>
            </div>

            {/* Program name */}
            <div className="border-t border-b border-primary/20 py-5 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{program.title}</h3>
              <p className="text-sm text-primary font-semibold">{program.certificate.subtitle}</p>
              <p className="text-xs text-gray-500 mt-1">{program.kicdAlignment}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Competencies Demonstrated</p>
              <div className="flex flex-wrap justify-center gap-2">
                {program.certificate.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1 text-xs bg-primary/6 text-primary px-3 py-1.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Score */}
            {postScore && (
              <p className="text-xs text-gray-500 mb-4">Post-Assessment Score: <span className="font-bold text-primary">{postScore}</span></p>
            )}

            {/* Date and signature */}
            <div className="flex items-end justify-between pt-4 border-t border-gray-100">
              <div className="text-left">
                <div className="text-xs text-gray-400 mb-1">Completed</div>
                <div className="font-semibold text-sm text-gray-700">{earnedDate}</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-xl font-bold text-primary" style={{ fontFamily: 'cursive' }}>Mwalimu AI</div>
                <div className="w-24 h-px bg-gray-300 my-1" />
                <div className="text-xs text-gray-400">Authorised Signature</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">Duration</div>
                <div className="font-semibold text-sm text-gray-700">{program.hours} hours</div>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4 print:hidden">
        Use your browser's print function to save as PDF or print. This certificate is KICD-aligned professional development.
      </p>
    </div>
  )
}
