import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'
import Link from 'next/link'
import { BookOpen, Zap, Users, Settings, HelpCircle, FileText } from 'lucide-react'

const docSections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn how to create an account, complete your profile, and begin your learning journey.',
    articles: [
      'Creating your account',
      'Completing the needs assessment',
      'Navigating the dashboard',
      'Setting up your profile',
    ],
  },
  {
    icon: FileText,
    title: 'Learning Modules',
    description: 'Understand how our structured learning modules work and how to track your progress.',
    articles: [
      'Module structure and lessons',
      'Completing activities and quizzes',
      'Tracking your progress',
      'Earning certificates',
    ],
  },
  {
    icon: Zap,
    title: 'AI Coach',
    description: 'Get the most out of your AI Coach conversations for personalized guidance.',
    articles: [
      'How the AI Coach works',
      'Asking effective questions',
      'Getting lesson plan help',
      'Classroom strategy advice',
    ],
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with fellow teachers, share resources, and participate in discussions.',
    articles: [
      'Posting and replying',
      'Sharing resources',
      'Community guidelines',
      'Finding relevant discussions',
    ],
  },
  {
    icon: Settings,
    title: 'Account Settings',
    description: 'Manage your profile, preferences, notifications, and subscription.',
    articles: [
      'Updating your profile',
      'Notification preferences',
      'Managing your subscription',
      'Deleting your account',
    ],
  },
  {
    icon: HelpCircle,
    title: 'Troubleshooting',
    description: 'Solutions to common technical issues and how to get additional support.',
    articles: [
      'Login problems',
      'Progress not saving',
      'Video playback issues',
      'Contacting support',
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton fallbackHref="/" />
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-semibold text-lg">Mwalimu AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about using Mwalimu AI effectively. Find guides, tutorials, and
          answers to common questions.
        </p>
      </section>

      {/* Search */}
      <section className="max-w-2xl mx-auto px-4 md:px-8 pb-12">
        <div className="relative">
          <input
            type="search"
            placeholder="Search documentation..."
            className="w-full px-4 py-3 rounded-lg border bg-background text-lg"
          />
        </div>
      </section>

      {/* Doc Sections */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section) => (
            <Card key={section.title} className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.articles.map((article) => (
                  <li key={article}>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch step-by-step guides on using every feature.
              </p>
              <Button variant="outline" size="sm">
                Watch Videos
              </Button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">CBC Quick Reference</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download our CBC implementation cheat sheet.
              </p>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ask questions and get help from other teachers.
              </p>
              <Link href="/dashboard/community">
                <Button variant="outline" size="sm">
                  Visit Forum
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Mwalimu AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
