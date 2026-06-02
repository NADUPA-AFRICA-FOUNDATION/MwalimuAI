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
  const { profile } = useProfile()
  const program = getProgramById(params.programId)

  const [progress, setProgress] = useState({ completedLessons: [] as string[], reflections: {} as Record<string, string>, certificateEarnedAt: undefined as string | undefined, postAssessment: undefined as { score: number; total: number } | undefined })
  const [mounted, setMounted]   = useState(false)
  const [shared, setShared]     = useState(false)
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
  }, [program])

  if (!program) return <div className="p-8 text-muted-foreground">Program not found.</div>

  const isUnlocked = mounted && !!progress.postAssessment
  const earnedDate = progress.certificateEarnedAt ?? new Date().toLocaleDateString()
  const teacherName = profile?.name ?? 'Teacher'
  const postScore   = progress.postAssessment ? `${progress.postAssessment.score}/${progress.postAssessment.total}` : null

  const handlePrint = () => {
    const win = window.open('', '_blank', 'width=1000,height=720')
    if (!win) return
    const certHtml = certRef.current?.innerHTML ?? ''
    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${program.title} — Certificate of Completion</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #f3f4f6;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh;
      padding: 32px;
    }
    .cert-wrap {
      background: #fff;
      max-width: 780px;
      width: 100%;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      position: relative;
    }
    .cert-wrap::before, .cert-wrap::after {
      content: '';
      position: absolute;
      border-radius: inherit;
      pointer-events: none;
    }
    .cert-wrap::before {
      inset: 12px;
      border: 2px solid rgba(99,102,241,0.18);
      border-radius: 14px;
    }
    .cert-wrap::after {
      inset: 16px;
      border: 1px solid rgba(99,102,241,0.09);
      border-radius: 10px;
    }
    .top-bar { height: 8px; background: linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1); }
    .body { padding: 48px 56px 40px; text-align: center; }
    .logo-row { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 28px; }
    .logo-icon {
      width: 52px; height: 52px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; color: #fff; font-weight: 800;
      box-shadow: 0 6px 20px rgba(99,102,241,0.35);
    }
    .logo-text-name { font-size: 18px; font-weight: 800; color: #1a1a2e; }
    .logo-text-sub  { font-size: 12px; color: #888; }
    .cert-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: #6366f115; color: #6366f1;
      border-radius: 30px; padding: 5px 16px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
      text-transform: uppercase; margin-bottom: 18px;
    }
    .cert-this { font-size: 14px; color: #888; margin-bottom: 6px; }
    .cert-name {
      font-size: 42px; font-weight: 800; color: #1a1a2e;
      font-family: Georgia, serif; letter-spacing: -0.5px; line-height: 1.1;
      margin-bottom: 6px;
    }
    .cert-has   { font-size: 14px; color: #888; margin-bottom: 0; }
    .program-box {
      border-top: 1px solid #e8e8f5;
      border-bottom: 1px solid #e8e8f5;
      padding: 20px 0; margin: 18px 0;
    }
    .program-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 3px; }
    .program-sub   { font-size: 13px; color: #6366f1; font-weight: 600; margin-bottom: 4px; }
    .program-align { font-size: 11px; color: #aaa; }
    .skills-label  { font-size: 10px; color: #aaa; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
    .skills-row    { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-bottom: 14px; }
    .skill-chip    {
      background: #6366f108; color: #6366f1;
      border: 1px solid #6366f125;
      border-radius: 20px; padding: 4px 12px;
      font-size: 11px; font-weight: 600;
    }
    .score-line { font-size: 12px; color: #aaa; margin-bottom: 16px; }
    .score-line strong { color: #6366f1; font-weight: 700; }
    .footer-row {
      display: flex; justify-content: space-between; align-items: flex-end;
      padding-top: 16px; border-top: 1px solid #f0f0f8;
    }
    .footer-col { text-align: left; }
    .footer-col:last-child { text-align: right; }
    .footer-col.center { text-align: center; }
    .footer-label { font-size: 11px; color: #bbb; margin-bottom: 2px; }
    .footer-value { font-size: 13px; font-weight: 700; color: #444; }
    .sig-name {
      font-size: 22px; font-weight: 700; color: #6366f1;
      font-family: 'Brush Script MT', 'Segoe Script', cursive;
      margin-bottom: 3px;
    }
    .sig-line { width: 100px; height: 1px; background: #e0e0ea; margin: 3px auto; }
    .sig-label { font-size: 10px; color: #bbb; }
    .bottom-bar { height: 5px; background: linear-gradient(90deg, #8b5cf6, #6366f1, #8b5cf6); }
    @media print {
      body { background: #fff; padding: 0; min-height: auto; }
      .cert-wrap { box-shadow: none; border-radius: 0; max-width: 100%; }
      @page { margin: 10mm; size: A4 landscape; }
    }
  </style>
</head>
<body>
<div class="cert-wrap">
  <div class="top-bar"></div>
  <div class="body">
    <div class="logo-row">
      <div class="logo-icon">M</div>
      <div>
        <div class="logo-text-name">Mwalimu AI</div>
        <div class="logo-text-sub">Professional Development Platform</div>
      </div>
    </div>
    <div class="cert-badge">🎓 Certificate of Completion</div>
    <div class="cert-this">This is to certify that</div>
    <div class="cert-name">${teacherName}</div>
    <div class="cert-has">has successfully completed the</div>
    <div class="program-box">
      <div class="program-title">${program.title}</div>
      <div class="program-sub">${program.certificate.subtitle}</div>
      <div class="program-align">${program.kicdAlignment}</div>
    </div>
    <div class="skills-label">Competencies Demonstrated</div>
    <div class="skills-row">
      ${program.certificate.skills.map(s => `<span class="skill-chip">✓ ${s}</span>`).join('')}
    </div>
    ${postScore ? `<div class="score-line">Post-Assessment Score: <strong>${postScore}</strong></div>` : ''}
    <div class="footer-row">
      <div class="footer-col">
        <div class="footer-label">Completed</div>
        <div class="footer-value">${earnedDate}</div>
      </div>
      <div class="footer-col center">
        <div class="sig-name">Mwalimu AI</div>
        <div class="sig-line"></div>
        <div class="sig-label">Authorised Signature</div>
      </div>
      <div class="footer-col">
        <div class="footer-label">Duration</div>
        <div class="footer-value">${program.hours} hours</div>
      </div>
    </div>
  </div>
  <div class="bottom-bar"></div>
</div>
<script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`)
    win.document.close()
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
            <Button size="sm" onClick={handlePrint} className="rounded-xl gap-2">
              <Printer className="w-4 h-4" /> Save as PDF
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
