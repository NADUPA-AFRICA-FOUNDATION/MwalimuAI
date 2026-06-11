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

/**
 * Like requireAuth, but also returns the caller's user id so routes can
 * key per-user rate limits and ownership records.
 */
export async function requireAuthUser(
  req: Request,
): Promise<{ userId: string; error: null } | { userId: null; error: Response }> {
  const supabase = await createClient()
  const token = req.headers.get('Authorization')?.split('Bearer ')[1]

  const { data: { user } } = token
    ? await supabase.auth.getUser(token)
    : await supabase.auth.getUser()

  if (!user) {
    return {
      userId: null,
      error: new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    }
  }
  return { userId: user.id, error: null }
}
