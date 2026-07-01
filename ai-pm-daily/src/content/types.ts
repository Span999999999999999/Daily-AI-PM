import type { LucideIcon } from 'lucide-react'

export type SkillId =
  | 'ai-fundamentals'
  | 'ai-engineering'
  | 'product-thinking'
  | 'experimentation'

export interface Skill {
  id: SkillId
  name: string
  icon: LucideIcon
  /** tailwind gradient classes for the skill badge/accent */
  accent: string
}

/** A single node in a concept flow diagram. */
export interface DiagramNode {
  id: string
  label: string
  sub?: string
  /** tailwind bg/text classes for the node chip */
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'slate'
}

/** A directed edge between two node ids. */
export interface DiagramEdge {
  from: string
  to: string
}

export interface Diagram {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

/** An "arrange the steps in the correct order" challenge. */
export interface OrderingChallenge {
  kind: 'ordering'
  prompt: string
  /** steps listed in the CORRECT order; the UI shuffles them for the user */
  steps: string[]
  successNote: string
}

export type Challenge = OrderingChallenge

export interface Concept {
  id: string
  title: string
  skillId: SkillId
  /** short one-liner shown in lists */
  tagline: string
  /** minutes, shown as "N min lesson" */
  minutes: number
  xp: number
  diagram: Diagram
  useCase: {
    scenario: string
    goal: string
    outcome: string
  }
  whyItMatters: string
  challenge: Challenge
}
