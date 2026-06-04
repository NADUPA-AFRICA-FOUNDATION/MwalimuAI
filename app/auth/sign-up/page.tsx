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
import { Eye, EyeOff, GraduationCap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function mapError(msg: string): string {
  if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('already exists'))
    return 'An account with this email already exists. Try signing in instead.'
  if (msg.includes('valid email')) return 'Please enter a valid email address.'
  if (msg.includes('least 6'))    return 'Password must be at least 6 characters.'
  if (msg.includes('rate limit') || msg.includes('after 60'))
    return 'Too many attempts. Please wait 60 seconds and try again.'
  if (msg.includes('disabled') || msg.includes('not enabled'))
    return 'Email sign-up is currently disabled. Please contact support.'
  if (msg.includes('redirect'))
    return 'Configuration error: redirect URL not allowed. Please contact support.'
  // Surface the raw Supabase message so we can diagnose unexpected errors
  return `Sign-up failed: ${msg}`
}

export default function Page() {
  const [email, setEmail]                   = useState('')
  const [password, setPassword]             = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword]     = useState(false)
  const [error, setError]                   = useState<string | null>(null)
  const [isLoading, setIsLoading]           = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) { setError('Passwords do not match.'); return }
    if (password.length < 6)         { setError('Password must be at least 6 characters.'); return }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (authError) { setError(mapError(authError.message)); return }
      router.push('/auth/sign-up-success')
    } catch {
      setError('Sign-up failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.52 0.20 160 / 0.15) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.70 0.20 55 / 0.12) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle, oklch(0.52 0.20 160 / 0.10) 0%, transparent 70%)' }} />
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

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Start your CBC professional development journey</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} noValidate>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" inputMode="email" autoComplete="email" spellCheck={false}
                      placeholder="you@school.ac.ke" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                        required className="pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">Confirm Password</Label>
                    <Input id="repeat-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                      required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-destructive rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <><Spinner className="mr-2 size-4" />Creating account…</> : 'Create account'}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-medium text-primary underline underline-offset-4">Sign in</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
