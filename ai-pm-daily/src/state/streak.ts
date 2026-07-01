/** Local calendar date as YYYY-MM-DD (no timezone surprises across reloads). */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Whole-day difference between two YYYY-MM-DD keys (b - a). */
export function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number)
  const [by, bm, bd] = b.split('-').map(Number)
  const da = Date.UTC(ay, am - 1, ad)
  const db = Date.UTC(by, bm - 1, bd)
  return Math.round((db - da) / 86_400_000)
}

/**
 * Given the last active date and current streak, compute the streak for today.
 * - same day  -> unchanged
 * - yesterday -> +1
 * - older / never -> reset to 1
 */
export function nextStreak(
  lastActive: string | null,
  currentStreak: number,
  today: string = todayKey(),
): number {
  if (!lastActive) return 1
  const diff = dayDiff(lastActive, today)
  if (diff <= 0) return currentStreak || 1
  if (diff === 1) return currentStreak + 1
  return 1
}
