'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import {
  BookOpen,
  Zap,
  Users,
  Award,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Star,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Mwalimu AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">Log In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="font-medium shadow-lg shadow-primary/25">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Professional Development</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Empowering{' '}
              <span className="text-primary relative">
                Kenyan Teachers
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-accent" />
                </svg>
              </span>
              {' '}with CBC Mastery
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Master the Competency-Based Curriculum with personalized AI coaching, 
              structured learning modules, and a vibrant community of educators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Free to get started</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>KICD aligned content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Active Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">47</div>
              <div className="text-sm text-muted-foreground">Counties Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Learning Modules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" /> Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for CBC implementation success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Structured Learning Modules</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Curated courses covering CBC fundamentals, assessment strategies, and modern pedagogy with flexible pacing.
              </p>
              <Link href="/dashboard/modules" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                Explore Modules <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <MessageSquare className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3">AI Coach Support</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Get instant answers and personalized guidance from your AI coach for any classroom challenges you face.
              </p>
              <Link href="/dashboard/ai-coach" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                Try AI Coach <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Teacher Community</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Connect with fellow educators across Kenya, share resources, and learn from real classroom experiences.
              </p>
              <Link href="/dashboard/community" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                Join Community <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3">Achievement Badges</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Track your progress and celebrate milestones as you develop your CBC expertise with recognition badges.
              </p>
              <Link href="/dashboard/achievements" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                View Badges <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Personalized Assessment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Complete a needs assessment to receive a customized learning path based on your experience and goals.
              </p>
              <Link href="/dashboard/assessment" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                Take Assessment <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/30">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <TrendingUp className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Monitor your learning journey with detailed analytics and see the impact on your teaching practice.
              </p>
              <Link href="/dashboard" className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
                View Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started in minutes and begin your professional development journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">Create Your Account</h3>
              <p className="text-muted-foreground">
                Sign up for free and complete your teacher profile with your experience level and subjects.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-accent/30">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">Take the Assessment</h3>
              <p className="text-muted-foreground">
                Complete a quick needs assessment so we can personalize your learning path and recommendations.
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/30">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">Start Learning</h3>
              <p className="text-muted-foreground">
                Access your personalized modules, chat with your AI coach, and connect with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Teachers</h2>
            <p className="text-muted-foreground text-lg">Hear from educators transforming their classrooms with Mwalimu AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-border/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;The AI coach has been a game-changer for me. I can ask questions at any time and get practical advice for my Grade 4 class.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">JM</span>
                </div>
                <div>
                  <div className="font-semibold">Jane Muthoni</div>
                  <div className="text-sm text-muted-foreground">Primary Teacher, Nairobi</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;The structured modules helped me understand CBC assessment better than any workshop I have attended. Highly recommended!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-accent">PO</span>
                </div>
                <div>
                  <div className="font-semibold">Peter Ochieng</div>
                  <div className="text-sm text-muted-foreground">Science Teacher, Kisumu</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;I love connecting with other teachers in the community. Sharing resources and experiences has made implementation easier.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">FK</span>
                </div>
                <div>
                  <div className="font-semibold">Faith Kemunto</div>
                  <div className="text-sm text-muted-foreground">Math Teacher, Mombasa</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <Card className="relative overflow-hidden p-12 md:p-16 text-center border-0 bg-primary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-primary-foreground/80 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Join thousands of Kenyan teachers using Mwalimu AI to master CBC and create better learning outcomes for their students.
              </p>
              <Link href="/auth/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 font-semibold shadow-xl">
                  Start Your Free Journey Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Mwalimu AI</span>
              </Link>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Empowering Kenyan teachers with AI-powered professional development for CBC excellence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Mwalimu AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/docs" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
