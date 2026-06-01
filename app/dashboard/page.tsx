'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Trophy, 
  Users, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-primary rounded-2xl p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Welcome back!</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                Ready to continue learning?
              </h1>
              <p className="text-primary-foreground/80 max-w-xl">
                Pick up where you left off or explore new CBC teaching strategies with your AI coach.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/dashboard/ai-coach">
                <Button size="lg" variant="secondary" className="gap-2 shadow-lg font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  Chat with AI Coach
                </Button>
              </Link>
              <Link href="/dashboard/modules">
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <BookOpen className="w-4 h-4" />
                  Browse Modules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Modules Completed</p>
              <p className="text-3xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground mt-1">of 6 modules</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>
          <Progress value={33} className="mt-4 h-2" />
        </Card>

        <Card className="p-6 border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">AI Chat Sessions</p>
              <p className="text-3xl font-bold text-accent">12</p>
              <p className="text-xs text-muted-foreground mt-1">this week</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-xs text-primary">
            <TrendingUp className="w-3 h-3" />
            <span>+25% from last week</span>
          </div>
        </Card>

        <Card className="p-6 border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Community Posts</p>
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-xs text-muted-foreground mt-1">contributions</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span>Active contributor</span>
          </div>
        </Card>

        <Card className="p-6 border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
              <p className="text-3xl font-bold text-accent">3</p>
              <p className="text-xs text-muted-foreground mt-1">achievements</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex gap-1 mt-4">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary-foreground">1</span>
            </div>
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-[10px] text-accent-foreground">2</span>
            </div>
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary">3</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Continue Learning</h2>
          <Link href="/dashboard/modules" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 border-border/50 hover:shadow-lg transition-all group">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">In Progress</span>
                </div>
                <h3 className="font-semibold mb-1 truncate">CBC Assessment Strategies</h3>
                <p className="text-sm text-muted-foreground mb-3">Master formative and summative assessment techniques</p>
                <div className="flex items-center gap-4">
                  <Progress value={65} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-primary">65%</span>
                </div>
              </div>
            </div>
            <Link href="/dashboard/modules" className="absolute inset-0" />
          </Card>

          <Card className="p-6 border-border/50 hover:shadow-lg transition-all group">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">Recommended</span>
                </div>
                <h3 className="font-semibold mb-1 truncate">Learner-Centered Pedagogy</h3>
                <p className="text-sm text-muted-foreground mb-3">Implement student-focused teaching approaches</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>4 hours</span>
                  <span className="mx-1">-</span>
                  <span>8 lessons</span>
                </div>
              </div>
            </div>
            <Link href="/dashboard/modules" className="absolute inset-0" />
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/ai-coach">
            <Card className="p-5 border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Coach</h3>
                  <p className="text-sm text-muted-foreground">Get instant help</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/assessment">
            <Card className="p-5 border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Assessment</h3>
                  <p className="text-sm text-muted-foreground">Personalize path</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/community">
            <Card className="p-5 border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Join discussions</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/achievements">
            <Card className="p-5 border-border/50 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Achievements</h3>
                  <p className="text-sm text-muted-foreground">View badges</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
