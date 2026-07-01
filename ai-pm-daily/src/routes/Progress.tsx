import { Flame, Zap } from 'lucide-react'
import { useAppStore, skillStats, skillsMastered } from '../state/useAppStore'
import { levelInfo } from '../lib/xp'
import { CONCEPTS } from '../content/concepts'
import ProgressBar from '../components/ProgressBar'
import StatCard from '../components/StatCard'

export default function Progress() {
  const { xp, streak, completedLessons, completedChallenges } = useAppStore()
  const lvl = levelInfo(xp)
  const stats = skillStats(completedLessons, completedChallenges)

  const totalItems = CONCEPTS.length * 2
  const doneItems = completedLessons.length + completedChallenges.length
  const overall = totalItems === 0 ? 0 : doneItems / totalItems

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold">Progress</h1>
        <p className="text-sm text-slate-400">Track your growth.</p>
      </header>

      <section className="card space-y-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold">Overall Progress</span>
          <span className="text-sm text-slate-400">{Math.round(overall * 100)}%</span>
        </div>
        <ProgressBar value={overall} />
        <div className="pt-1 text-xs text-slate-400">
          Level {lvl.level} · {xp} XP total
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <StatCard icon={Flame} value={streak} label="Day streak" iconClass="text-orange-400" />
        <StatCard icon={Zap} value={xp} label="Total XP" />
        <StatCard
          icon={Flame}
          value={skillsMastered(completedLessons, completedChallenges)}
          label="Skills mastered"
          iconClass="text-emerald-400"
        />
      </section>

      <section className="card space-y-4 p-4">
        <h2 className="text-sm font-semibold">Skills</h2>
        {stats.map((s) => (
          <div key={s.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">{s.name}</span>
              <span className="text-slate-400">{s.percent}%</span>
            </div>
            <ProgressBar value={s.percent / 100} />
          </div>
        ))}
      </section>
    </div>
  )
}
