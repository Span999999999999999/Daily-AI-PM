import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { SKILL_LIST } from '../content/skills'
import { conceptsForSkill } from '../content/concepts'
import { useAppStore } from '../state/useAppStore'
import SkillBadge from '../components/SkillBadge'
import XPBadge from '../components/XPBadge'

export default function Learn() {
  const { completedLessons } = useAppStore()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold">Learn</h1>
        <p className="text-sm text-slate-400">Concepts with simple diagrams.</p>
      </header>

      {SKILL_LIST.map((skill) => {
        const concepts = conceptsForSkill(skill.id)
        if (concepts.length === 0) return null
        return (
          <section key={skill.id} className="space-y-2">
            <SkillBadge skillId={skill.id} />
            <div className="space-y-2">
              {concepts.map((c) => {
                const done = completedLessons.includes(c.id)
                return (
                  <Link
                    key={c.id}
                    to={`/learn/${c.id}`}
                    className="card flex items-center justify-between gap-3 p-4 transition active:scale-[0.99]"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        {done && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
                        <span className="truncate font-semibold">{c.title}</span>
                      </div>
                      <p className="text-xs text-slate-400">{c.tagline}</p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <XPBadge xp={c.xp} />
                        <span className="text-[11px] text-slate-500">{c.minutes} min</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
