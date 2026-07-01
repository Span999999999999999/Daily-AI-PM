import { Brain, Network, Lightbulb, FlaskConical } from 'lucide-react'
import type { Skill, SkillId } from './types'

export const SKILLS: Record<SkillId, Skill> = {
  'ai-fundamentals': {
    id: 'ai-fundamentals',
    name: 'AI Fundamentals',
    icon: Brain,
    accent: 'from-indigo-500 to-violet-500',
  },
  'ai-engineering': {
    id: 'ai-engineering',
    name: 'AI Engineering',
    icon: Network,
    accent: 'from-sky-500 to-blue-600',
  },
  'product-thinking': {
    id: 'product-thinking',
    name: 'Product Thinking',
    icon: Lightbulb,
    accent: 'from-amber-400 to-orange-500',
  },
  experimentation: {
    id: 'experimentation',
    name: 'Experimentation',
    icon: FlaskConical,
    accent: 'from-emerald-400 to-green-600',
  },
}

export const SKILL_LIST: Skill[] = Object.values(SKILLS)
