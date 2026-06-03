import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing-header'
import { MarketingFooter } from '@/components/marketing-footer'
import Link from 'next/link'
import {
  BookOpen,
  Zap,
  Users,
  Award,
  MessageSquare,
  TrendingUp,
  Brain,
  FileText,
  Target,
  Clock,
  Shield,
  Smartphone,
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Structured Learning Modules',
    description:
      'Comprehensive courses covering CBC fundamentals, assessment strategies, differentiated instruction, and modern pedagogy. Learn at your own pace with bite-sized lessons.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'AI Coach Support',
    description:
      'Get instant, personalized answers to your teaching questions 24/7. Our AI understands the Kenyan CBC context and provides practical, actionable advice.',
    color: 'green',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description:
      'Connect with thousands of fellow Kenyan educators. Share resources, discuss challenges, and learn from real classroom experiences across the country.',
    color: 'purple',
  },
  {
    icon: Award,
    title: 'Achievement Badges',
    description:
      'Celebrate your progress with digital badges and certificates. Track milestones and showcase your professional development achievements.',
    color: 'orange',
  },
  {
    icon: MessageSquare,
    title: 'Personalized Assessment',
    description:
      'Start with a comprehensive needs assessment that identifies your strengths and areas for growth, then receive a customized learning pathway.',
    color: 'red',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Visual dashboards show your learning journey, completed modules, quiz scores, and overall growth over time.',
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'CBC-Specific Content',
    description:
      'All content is designed specifically for the Kenyan Competency-Based Curriculum, aligned with KICD guidelines and real classroom needs.',
    color: 'pink',
  },
  {
    icon: FileText,
    title: 'Downloadable Resources',
    description:
      'Access lesson plan templates, assessment rubrics, activity guides, and other practical resources you can use immediately in your classroom.',
    color: 'yellow',
  },
  {
    icon: Target,
    title: 'Competency Mapping',
    description:
      'Track which CBC core competencies you are developing and how your learning translates to improved student outcomes.',
    color: 'indigo',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description:
      'Learn anytime, anywhere. Short modules fit into your busy schedule, whether during breaks, after school, or on weekends.',
    color: 'teal',
  },
  {
    icon: Shield,
    title: 'Offline Access',
    description:
      'Download lessons and resources for offline use. Perfect for areas with limited internet connectivity.',
    color: 'slate',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description:
      'Fully responsive design works seamlessly on smartphones, tablets, and computers. Learn on any device you have.',
    color: 'emerald',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  slate: 'bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400',
  emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader activePath="/features" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover all the tools and resources designed to help you master CBC teaching and transform your
          classroom practice.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorMap[feature.color]}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of Kenyan teachers already using Mwalimu AI to enhance their teaching practice.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </Card>
      </section>

      <MarketingFooter />
    </div>
  )
}
