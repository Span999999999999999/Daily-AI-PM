import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CONCEPTS } from '../content/concepts'
import { SKILL_LIST } from '../content/skills'
import type { SkillId } from '../content/types'
import { nextStreak, todayKey } from './streak'

interface AppState {
  xp: number
  streak: number
  lastActiveDate: string | null
  completedLessons: string[]
  completedChallenges: string[]

  /** Call once on app open: rolls the streak forward based on the calendar. */
  registerVisit: () => void
  completeLesson: (conceptId: string, xp: number) => void
  completeChallenge: (conceptId: string, xp: number) => void
  reset: () => void
}

const initial = {
  xp: 0,
  streak: 0,
  lastActiveDate: null as string | null,
  completedLessons: [] as string[],
  completedChallenges: [] as string[],
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initial,

      registerVisit: () =>
        set((s) => {
          const today = todayKey()
          if (s.lastActiveDate === today) return s
          return {
            streak: nextStreak(s.lastActiveDate, s.streak, today),
            lastActiveDate: today,
          }
        }),

      completeLesson: (conceptId, xp) =>
        set((s) => {
          if (s.completedLessons.includes(conceptId)) return s
          return {
            completedLessons: [...s.completedLessons, conceptId],
            xp: s.xp + xp,
            lastActiveDate: todayKey(),
          }
        }),

      completeChallenge: (conceptId, xp) =>
        set((s) => {
          if (s.completedChallenges.includes(conceptId)) return s
          return {
            completedChallenges: [...s.completedChallenges, conceptId],
            xp: s.xp + xp,
            lastActiveDate: todayKey(),
          }
        }),

      reset: () => set({ ...initial }),
    }),
    { name: 'ai-pm-daily-v1' },
  ),
)

// ---- Derived selectors (pure helpers over state) ----

export interface SkillStat {
  id: SkillId
  name: string
  /** 0..100 */
  percent: number
}

/** Percent complete per skill = completed items / total items across its concepts. */
export function skillStats(
  completedLessons: string[],
  completedChallenges: string[],
): SkillStat[] {
  return SKILL_LIST.map((skill) => {
    const concepts = CONCEPTS.filter((c) => c.skillId === skill.id)
    const total = concepts.length * 2 // lesson + challenge
    if (total === 0) return { id: skill.id, name: skill.name, percent: 0 }
    const done = concepts.reduce((acc, c) => {
      return (
        acc +
        (completedLessons.includes(c.id) ? 1 : 0) +
        (completedChallenges.includes(c.id) ? 1 : 0)
      )
    }, 0)
    return { id: skill.id, name: skill.name, percent: Math.round((done / total) * 100) }
  })
}

/** A skill counts as "mastered" once every concept lesson + challenge is done. */
export function skillsMastered(
  completedLessons: string[],
  completedChallenges: string[],
): number {
  return skillStats(completedLessons, completedChallenges).filter((s) => s.percent === 100)
    .length
}
