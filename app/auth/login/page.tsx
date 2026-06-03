'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { BackButton } from '@/components/back-button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, Lock, Mail } from 'lucide-react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Incorrect email or password.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support.'
    default:
      return 'Sign-in failed. Please try again.'
  }
}

export default function Page() {
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading]       = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email.trim(), password)
      if (!user.emailVerified) {
        router.push('/auth/sign-up-success')
        return
      }
      router.push('/dashboard')
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(mapFirebaseError(code))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <BackButton fallbackHref="/" />

          <Link href="/" className="flex items-center justify-center gap-3 self-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
              <GraduationCap className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight">Mwalimu AI</span>
          </Link>

          <Card className="border-border/60 shadow-xl shadow-primary/5 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription>Sign in to continue your CBC mastery journey</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} noValidate>
                <div className="flex flex-col gap-5">

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="you@example.com"
                        required
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        className="pl-9 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {showPassword
                          ? <EyeOff className="h-4 w-4" aria-hidden="true" />
                          : <Eye   className="h-4 w-4" aria-hidden="true" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-destructive rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end -mt-1">
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full shadow-lg shadow-primary/20" disabled={isLoading}>
                    {isLoading ? <><Spinner className="mr-2 size-4" />Signing in…</> : 'Sign in'}
                  </Button>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
