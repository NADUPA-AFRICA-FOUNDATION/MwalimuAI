import { createClient } from '@/lib/supabase/client'

async function getAccessToken(): Promise<string | null> {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  } catch {
    return null
  }
}

/**
 * Drop-in replacement for fetch() that automatically attaches
 * the current Supabase access token as an Authorization header.
 */
export async function authedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken()
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

/**
 * Returns auth headers for use in custom fetch overrides (e.g. useChat transports).
 */
export async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
