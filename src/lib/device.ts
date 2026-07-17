export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  const uaMatch = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  if (uaMatch) return true

  // Fallback for cases where the UA string doesn't clearly say "mobile"
  // (e.g. iPadOS reporting as desktop Safari): any coarse-pointer, primarily
  // touch device is treated as mobile too.
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(pointer: coarse)').matches
  }

  return false
}
