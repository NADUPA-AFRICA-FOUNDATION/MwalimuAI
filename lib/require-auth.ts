import { getAdminAuth } from './firebase-admin'

/**
 * Verifies the Firebase ID token in the Authorization header.
 * Returns null on success, or a 401 Response on failure.
 * Usage in route handlers:
 *   const authError = await requireAuth(req)
 *   if (authError) return authError
 */
export async function requireAuth(req: Request): Promise<Response | null> {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1]
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  try {
    await getAdminAuth().verifyIdToken(token)
    return null
  } catch {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
