'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen, MessageSquare, FileText, Trophy, Users, ArrowRight,
  Sparkles, TrendingUp, Clock, Star, ChevronRight, Flame, PenLine,
  CheckCircle2, X, Check,
} from 'lucide-react'
import Link from 'next/link'
import { getStreak, recordActivity, getBadgeInput, computeBadges } from '@/lib/streak'
import { useProfile } from '@/context/profile-context'

export default function DashboardPage() {
  const { profile } = useProfile()
  const [streak, setStreak] = useState({ current: 0, longest: 0, totalDays: 0, weekDays: Array(7).fill(false) as boolean[] })
  const [badgesEarned, setBadgesEarned] = useState(0)
  const [completedLessons, setCompletedLessons] = useState(0)
  const [toolsUsed, setToolsUsed] = useState(0)
  const [communityPosts, setCommunityPosts] = useState(0)
  const [learningProgress, setLearningProgress] = useState(0)   // % of first in-progress program
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)

  useEffect(() => {
    recordActivity('login')
    const s = getStreak()
    setStreak(s)
    const input = getBadgeInput()
    setBadgesEarned(computeBadges(input).filter(b => b.earned).length)
    setCompletedLessons(input.completedLessons)
    setToolsUsed(input.toolsUsed)
    setCommunityPosts(input.communityPosts)

    // Compute progress of the furthest-along learning-path program
    try {
      const raw = localStorage.getItem('mwalimu_learning_progress')
      if (raw) {
        const all = JSON.parse(raw) as Record<string, { completedLessons?: string[] }>
        const maxLessons = Object.values(all).reduce(
          (best, p) => Math.max(best, p.completedLessons?.length ?? 0), 0
        )
        // Assume programs average ~12 lessons; cap display at 99%
        setLearningProgress(Math.min(99, Math.round((maxLessons / 12) * 100)))
      }
    } catch {}

    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') setShowPaymentSuccess(true)
  }, [])

  const teacherName = profile?.name && profile.name !== 'Teacher' ? profile.name : 'Teacher'

  return (
    <div className="space-y-7">

      {/* Payment success banner */}
      {showPaymentSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium flex-1">Payment successful! Your plan has been upgraded. Welcome to the Professional tier.</p>
          <button onClick={() => setShowPaymentSuccess(false)} className="shrink-0 p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/40">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Welcome Banner ───────────────────────────────── */}
      <div className="relative overflow-hidden bg-primary rounded-2xl p-7 md:p-10">
        {/* Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_80%,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/8 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                {streak.current >= 3 ? (
                  <><Flame className="w-3.5 h-3.5" />{streak.current}-day streak</>
                ) : (
                  <><Sparkles className="w-3.5 h-3.5 animate-spin-slow" />Welcome back</>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 tracking-tight">
                Ready to continue learning, {teacherName}?
              </h1>
              <p className="text-primary-foreground/75 text-sm max-w-md leading-relaxed">
                Pick up where you left off or explore new CBC teaching strategies with your AI coach.
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap shrink-0">
              <Link href="/dashboard/ai-coach">
                <Button size="sm" variant="secondary" className="gap-2 shadow-lg font-semibold rounded-xl px-5">
                  <MessageSquare className="w-4 h-4" />
                  AI Coach
                </Button>
              </Link>
              <Link href="/dashboard/modules">
                <Button size="sm" variant="outline" className="gap-2 bg-white/10 border-white/25 text-white hover:bg-white/20 hover:text-white hover:border-white/30 rounded-xl px-5">
                  <BookOpen className="w-4 h-4" />
                  Browse Modules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="glass rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Lessons completed</p>
              <p className="text-3xl font-bold gradient-text tabular-nums">{completedLessons}</p>
              <p className="text-xs text-muted-foreground mt-1">{completedLessons === 0 ? 'Start your first lesson' : 'lessons done'}</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
          </div>
          <Progress value={Math.min(100, (completedLessons / 36) * 100)} className="h-1.5" />
        </div>

        <div className="glass rounded-2xl p-5 hover:shadow-lg hover:shadow-accent/8 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Tools used</p>
              <p className="text-3xl font-bold text-accent tabular-nums">{toolsUsed}</p>
              <p className="text-xs text-muted-foreground mt-1">{toolsUsed === 0 ? 'Try a Teacher Tool' : toolsUsed === 1 ? 'tool tried' : 'tools tried'}</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            {toolsUsed === 0 ? 'Lesson plans, feedback & more' : `${7 - Math.min(toolsUsed, 7)} more to explore`}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Community posts</p>
              <p className="text-3xl font-bold gradient-text tabular-nums">{communityPosts}</p>
              <p className="text-xs text-muted-foreground mt-1">{communityPosts === 0 ? 'Nothing posted yet' : communityPosts === 1 ? 'contribution' : 'contributions'}</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            {communityPosts === 0 ? 'Share ideas with colleagues' : 'Active contributor'}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 hover:shadow-lg hover:shadow-accent/8 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Badges earned</p>
              <p className="text-3xl font-bold text-accent tabular-nums">{badgesEarned}</p>
              <p className="text-xs text-muted-foreground mt-1">{badgesEarned === 0 ? 'None yet' : 'achievements'}</p>
            </div>
            <div className="w-11 h-11 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            {badgesEarned === 0 ? 'Complete lessons to earn badges' : `${12 - badgesEarned} more to unlock`}
          </div>
        </div>

      </div>

      {/* ── Continue Learning ────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold tracking-tight">Continue Learning</h2>
          <Link href="/dashboard/modules" className="text-xs text-primary hover:text-primary/80 font-semibold flex items-center gap-0.5 transition-colors">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="glass rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative cursor-pointer group">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:from-primary/30 transition-all">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold inline-block mb-2 ${learningProgress > 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {learningProgress > 0 ? 'In Progress' : 'Start Learning'}
                </span>
                <h3 className="font-semibold text-sm mb-1 truncate tracking-tight">CBC Foundations Program</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Build your core CBC knowledge and classroom skills</p>
                {learningProgress > 0 ? (
                  <div className="flex items-center gap-3">
                    <Progress value={learningProgress} className="flex-1 h-1.5" />
                    <span className="text-xs font-semibold text-primary tabular-nums">{learningProgress}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Begin your first lesson today</span>
                  </div>
                )}
              </div>
            </div>
            <Link href="/dashboard/learning" className="absolute inset-0" aria-label="CBC Foundations Program" />
          </div>

          <div className="glass rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative cursor-pointer group">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center shrink-0 group-hover:from-accent/30 transition-all">
                <FileText className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-semibold inline-block mb-2">Recommended</span>
                <h3 className="font-semibold text-sm mb-1 truncate tracking-tight">Learner-Centered Pedagogy</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Implement student-focused teaching approaches effectively</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>4 hours · 8 lessons</span>
                </div>
              </div>
            </div>
            <Link href="/dashboard/modules" className="absolute inset-0" aria-label="Start Learner-Centered Pedagogy" />
          </div>

        </div>
      </div>

      {/* ── Quick Actions ────────────────────────────────── */}
      <div>
        <h2 className="text-base font-bold tracking-tight mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: '/dashboard/ai-coach',    icon: Sparkles,    color: 'from-primary/18 to-primary/5 text-primary',  label: 'AI Coach',      sub: 'Get instant help'   },
            { href: '/dashboard/assessment',  icon: FileText,    color: 'from-accent/18 to-accent/5 text-accent',     label: 'Assessment',    sub: 'Personalise path'   },
            { href: '/dashboard/community',   icon: Users,       color: 'from-primary/18 to-primary/5 text-primary',  label: 'Community',     sub: 'Join discussions'   },
            { href: '/dashboard/achievements',icon: Trophy,      color: 'from-accent/18 to-accent/5 text-accent',     label: 'Achievements',  sub: 'View badges'        },
          ].map(({ href, icon: Icon, color, label, sub }) => (
            <Link key={href} href={href}>
              <div className="glass rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 hover:shadow-primary/5 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm tracking-tight">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Daily Streak ─────────────────────────────────── */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm tracking-tight">
                {streak.current > 0 ? `${streak.current}-Day Streak` : 'Start Your Streak'}
              </p>
              <p className="text-xs text-muted-foreground">
                {streak.current === 0 ? 'Complete a lesson today to begin' :
                 streak.current >= 7  ? "You're on a roll! Keep it up." :
                 `Longest: ${streak.longest} days · Total: ${streak.totalDays} active days`}
              </p>
            </div>
          </div>
          <Link href="/dashboard/achievements">
            <Button size="sm" variant="outline" className="text-xs rounded-xl border-border/60 hover:border-primary/40 hover:text-primary transition-all">
              View Badges
            </Button>
          </Link>
        </div>

        {/* Last 7 days — oldest left, today right */}
        <div className="flex gap-1.5">
          {['6d','5d','4d','3d','2d','1d','Today'].map((label, i) => {
            const dataIdx = 6 - i   // weekDays[0]=today, [6]=6d ago
            const active  = streak.weekDays[dataIdx]
            const isToday = i === 6
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : isToday ? 'bg-muted/80 border-2 border-dashed border-primary/30 text-muted-foreground/40' : 'bg-muted/60 text-muted-foreground/20'
                }`}>
                  {active
                    ? <Check className="w-2.5 h-2.5" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-current inline-block opacity-60" />
                  }
                </div>
                <span className="text-[9px] text-muted-foreground truncate w-full text-center">{label}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
