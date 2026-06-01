'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackButton } from '@/components/back-button'
import { Trophy, Star, Zap, BookOpen } from 'lucide-react'

const badges = [
  {
    id: 1,
    name: 'CBC Explorer',
    description: 'Completed your first CBC module',
    icon: BookOpen,
    earned: false,
    earnedDate: null,
  },
  {
    id: 2,
    name: 'Assessment Master',
    description: 'Completed all assessment strategy modules',
    icon: Star,
    earned: false,
    earnedDate: null,
  },
  {
    id: 3,
    name: 'Community Contributor',
    description: 'Participated in 10 forum discussions',
    icon: Trophy,
    earned: false,
    earnedDate: null,
  },
  {
    id: 4,
    name: 'Quick Learner',
    description: 'Completed a module in less than 20 minutes',
    icon: Zap,
    earned: false,
    earnedDate: null,
  },
  {
    id: 5,
    name: 'Curriculum Expert',
    description: 'Completed all foundational modules',
    icon: BookOpen,
    earned: false,
    earnedDate: null,
  },
  {
    id: 6,
    name: 'Inclusive Educator',
    description: 'Completed all inclusion and diversity modules',
    icon: Star,
    earned: false,
    earnedDate: null,
  },
]

export default function AchievementsPage() {
  const earnedBadges = badges.filter((b) => b.earned)
  const totalProgress = (earnedBadges.length / badges.length) * 100

  return (
    <div className="space-y-8">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      <div>
        <h1 className="text-3xl font-bold mb-2">Achievements & Badges</h1>
        <p className="text-muted-foreground">
          Track your progress and celebrate your professional development milestones.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between flex-col md:flex-row gap-6">
          <div>
            <h3 className="font-semibold mb-2">Overall Progress</h3>
            <p className="text-3xl font-bold text-primary">
              {earnedBadges.length}/{badges.length}
            </p>
            <p className="text-sm text-muted-foreground">badges earned</p>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative w-full h-full">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(2 * Math.PI * 45 * totalProgress) / 100} ${2 * Math.PI * 45}`}
                  className="text-primary transition-all"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{Math.round(totalProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <Card
                  key={badge.id}
                  className="p-6 text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-900"
                >
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {badge.earnedDate && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                      Earned {badge.earnedDate}
                    </p>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Available Badges */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Available Badges ({badges.filter((b) => !b.earned).length} remaining)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges
            .filter((b) => !b.earned)
            .map((badge) => {
              const Icon = badge.icon
              return (
                <Card key={badge.id} className="p-6 text-center opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )
}
