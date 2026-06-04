import { createClient } from '@/lib/supabase/server'

/**
 * Verifies the Supabase session from cookies (or a Bearer token if provided).
 * Returns null on success, or a 401 Response on failure.
 */
export async function requireAuth(req: Request): Promise<Response | null> {
  const supabase = await createClient()
  const token = req.headers.get('Authorization')?.split('Bearer ')[1]

  const { data: { user } } = token
    ? await supabase.auth.getUser(token)
    : await supabase.auth.getUser()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return null
}
