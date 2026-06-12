/**
 * Pure decision for the single-device watchdog (no React / Supabase deps so it
 * is unit-testable). `claimed` is the device id THIS browser wrote when it
 * claimed the account — captured in a ref, so it survives localStorage
 * eviction and cannot cause a false logout.
 *
 *   'ok'      — we still own the account, do nothing
 *   'reclaim' — no owner recorded (or we never claimed); take ownership
 *   'logout'  — another device took over while we were active
 *
 * Never returns 'logout' when we have not yet claimed, so a returning sole
 * device re-asserts ownership instead of locking itself out.
 */
export function decideDeviceAction(
  remote: string | null,
  claimed: string | null,
): 'ok' | 'reclaim' | 'logout' {
  if (!remote) return 'reclaim'
  if (!claimed) return 'reclaim'
  return remote === claimed ? 'ok' : 'logout'
}
