import { Link, useNavigate } from 'react-router-dom'
import { Flame, Zap, CheckCircle2, ChevronRight, Rocket } from 'lucide-react'
import { CONCEPTS } from '../content/concepts'
import { useAppStore, skillsMastered } from '../state/useAppStore'
import { levelInfo } from '../lib/xp'
import { dayDiff } from '../state/streak'
import ProgressBar from '../components/ProgressBar'
import StatCard from '../components/StatCard'
import SkillBadge from '../components/SkillBadge'

/** Deterministic "today's focus" so it's stable within a day but rotates daily. */
function todaysConcept() {
  const idx = Math.abs(dayDiff('2024-01-01', new Date().toISOString().slice(0, 10)))
  return CONCEPTS[idx % CONCEPTS.length]
}

export default function Home() {
  const navigate = useNavigate()
  const { xp, streak, completedLessons, completedChallenges } = useAppStore()
  const lvl = levelInfo(xp)
  const focus = todaysConcept()
  const focusDone =
    completedLessons.includes(focus.id) && completedChallenges.includes(focus.id)

  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-lg">
          🧠
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">AI PM Daily</h1>
          <p className="text-xs text-slate-400">Learn. Practice. Ship.</p>
        </div>
      </header>

      {/* Daily mission */}
      <section className="card space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Flame className="h-4 w-4 text-orange-400" />
          Daily Mission
        </div>
        <p className="text-sm text-slate-300">
          Improve your AI PM skills — one concept today: <br />
          <span className="font-semibold text-white">{focus.title}</span>
        </p>
        <button className="btn-primary" onClick={() => navigate(`/learn/${focus.id}`)}>
          <Rocket className="h-4 w-4" />
          {focusDone ? 'Review Today’s Mission' : 'Start Today’s Mission'}
        </button>
      </section>

      {/* Level + XP */}
      <section className="card space-y-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold">Level {lvl.level}</span>
          <span className="text-xs text-slate-400">
            {lvl.intoLevel} / {lvl.levelSpan} XP
          </span>
        </div>
        <ProgressBar value={lvl.progress} />
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-3 gap-3">
        <StatCard icon={Flame} value={streak} label="Day streak" iconClass="text-orange-400" />
        <StatCard
          icon={CheckCircle2}
          value={skillsMastered(completedLessons, completedChallenges)}
          label="Skills mastered"
          iconClass="text-emerald-400"
        />
        <StatCard
          icon={Zap}
          value={completedChallenges.length}
          label="Challenges done"
        />
      </section>

      {/* Today's focus card */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-300">Today’s Focus</h2>
        <Link
          to={`/learn/${focus.id}`}
          className="card flex items-center justify-between gap-3 p-4 transition active:scale-[0.99]"
        >
          <div className="space-y-2">
            <SkillBadge skillId={focus.skillId} />
            <div className="font-semibold">{focus.title}</div>
            <div className="text-xs text-slate-400">{focus.minutes} min lesson</div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
        </Link>
      </section>
    </div>
  )
}
