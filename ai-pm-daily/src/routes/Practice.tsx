import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowUp, ArrowDown, CheckCircle2, ChevronRight, XCircle } from 'lucide-react'
import { CONCEPTS, CONCEPTS_BY_ID } from '../content/concepts'
import { useAppStore } from '../state/useAppStore'
import SkillBadge from '../components/SkillBadge'
import XPBadge from '../components/XPBadge'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  // avoid handing back the already-correct order
  if (a.every((v, i) => v === arr[i]) && a.length > 1) {
    ;[a[0], a[1]] = [a[1], a[0]]
  }
  return a
}

/** Picker shown at /practice with no concept selected. */
function PracticeList() {
  const { completedChallenges } = useAppStore()
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold">Practice</h1>
        <p className="text-sm text-slate-400">Hands-on challenges to apply what you learned.</p>
      </header>
      <div className="space-y-2">
        {CONCEPTS.map((c) => {
          const done = completedChallenges.includes(c.id)
          return (
            <Link
              key={c.id}
              to={`/practice/${c.id}`}
              className="card flex items-center justify-between gap-3 p-4 transition active:scale-[0.99]"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  {done && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
                  <span className="truncate font-semibold">{c.title}</span>
                </div>
                <p className="text-xs text-slate-400">{c.challenge.prompt}</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Practice() {
  const { conceptId } = useParams()
  if (!conceptId) return <PracticeList />
  return <OrderingChallengeView conceptId={conceptId} />
}

function OrderingChallengeView({ conceptId }: { conceptId: string }) {
  const navigate = useNavigate()
  const concept = CONCEPTS_BY_ID[conceptId]
  const completeChallenge = useAppStore((s) => s.completeChallenge)

  const correct = concept?.challenge.steps ?? []
  const [order, setOrder] = useState<string[]>(() => shuffle(correct))
  const [checked, setChecked] = useState(false)

  const isCorrect = useMemo(
    () => order.length === correct.length && order.every((s, i) => s === correct[i]),
    [order, correct],
  )

  if (!concept) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">That challenge doesn’t exist.</p>
        <Link to="/practice" className="text-brand-400">
          ← Back to Practice
        </Link>
      </div>
    )
  }

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
    setChecked(false)
  }

  // Practice is worth half the lesson's XP.
  const challengeXp = Math.round(concept.xp / 2)

  const submit = () => {
    setChecked(true)
    if (isCorrect) completeChallenge(concept.id, challengeXp)
  }

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-slate-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <SkillBadge skillId={concept.skillId} />
          <XPBadge xp={challengeXp} />
        </div>
        <h1 className="text-xl font-bold leading-tight">Challenge: {concept.title}</h1>
        <p className="text-sm text-slate-300">{concept.challenge.prompt}</p>
      </header>

      <ol className="space-y-2">
        {order.map((step, i) => (
          <li
            key={step}
            className="card flex items-center gap-3 p-3"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
              {i + 1}
            </span>
            <span className="flex-1 text-sm">{step}</span>
            <div className="flex flex-col gap-1">
              <button
                aria-label="Move up"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded-md bg-ink-700 p-1 text-slate-300 disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                aria-label="Move down"
                onClick={() => move(i, 1)}
                disabled={i === order.length - 1}
                className="rounded-md bg-ink-700 p-1 text-slate-300 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ol>

      {checked && isCorrect && (
        <div className="flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{concept.challenge.successNote}</span>
        </div>
      )}
      {checked && !isCorrect && (
        <div className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Not quite — reorder the steps and try again.</span>
        </div>
      )}

      {isCorrect && checked ? (
        <button className="btn-primary" onClick={() => navigate('/progress')}>
          See Progress →
        </button>
      ) : (
        <button className="btn-primary" onClick={submit}>
          Submit Answer
        </button>
      )}
    </div>
  )
}
