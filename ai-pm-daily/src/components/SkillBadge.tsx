import { SKILLS } from '../content/skills'
import type { SkillId } from '../content/types'

export default function SkillBadge({ skillId }: { skillId: SkillId }) {
  const skill = SKILLS[skillId]
  const Icon = skill.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${skill.accent} px-2.5 py-1 text-xs font-medium text-white/95`}
    >
      <Icon className="h-3.5 w-3.5" />
      {skill.name}
    </span>
  )
}
