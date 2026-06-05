// Central registry of in-flight Supabase write promises.
//
// trackWrite() — register a promise before fire-and-forget dispatch.
// flushWrites() — await all pending writes up to `timeoutMs`.
//
// signOut() calls flushWrites() so the session token is never invalidated
// while a write is still in flight.

const pending = new Set<Promise<unknown>>()

export function trackWrite(p: Promise<unknown>): void {
  pending.add(p)
  p.finally(() => pending.delete(p))
}

export async function flushWrites(timeoutMs = 3000): Promise<void> {
  if (pending.size === 0) return
  await Promise.race([
    Promise.allSettled([...pending]),
    new Promise<void>(r => setTimeout(r, timeoutMs)),
  ])
}
