import { auth } from '@/lib/firebase'

async function getIdToken(): Promise<string | null> {
  try {
    return (await auth?.currentUser?.getIdToken()) ?? null
  } catch {
    return null
  }
}

/**
 * Drop-in replacement for fetch() that automatically attaches
 * the current Firebase ID token as an Authorization header.
 */
export async function authedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const token = await getIdToken()
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
  const token = await getIdToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
