/** XP required to *finish* a given level (i.e. reach the next one). */
const LEVEL_STEP = 500

export interface LevelInfo {
  level: number
  /** xp accumulated within the current level */
  intoLevel: number
  /** xp needed to complete the current level */
  levelSpan: number
  /** 0..1 progress through the current level */
  progress: number
}

export function levelInfo(totalXp: number): LevelInfo {
  const level = Math.floor(totalXp / LEVEL_STEP) + 1
  const intoLevel = totalXp % LEVEL_STEP
  return {
    level,
    intoLevel,
    levelSpan: LEVEL_STEP,
    progress: intoLevel / LEVEL_STEP,
  }
}
