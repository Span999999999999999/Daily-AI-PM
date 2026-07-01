import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Target, Trophy, Sparkles, CheckCircle2 } from 'lucide-react'
import { CONCEPTS_BY_ID } from '../content/concepts'
import { useAppStore } from '../state/useAppStore'
import FlowDiagram from '../components/FlowDiagram'
import SkillBadge from '../components/SkillBadge'
import XPBadge from '../components/XPBadge'

export default function LessonDetail() {
  const { conceptId } = useParams()
  const navigate = useNavigate()
  const concept = conceptId ? CONCEPTS_BY_ID[conceptId] : undefined
  const { completedLessons, completeLesson } = useAppStore()

  if (!concept) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">That lesson doesn’t exist.</p>
        <Link to="/learn" className="text-brand-400">
          ← Back to Learn
        </Link>
      </div>
    )
  }

  const done = completedLessons.includes(concept.id)

  const finishLesson = () => {
    completeLesson(concept.id, concept.xp)
    navigate(`/practice/${concept.id}`)
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
          <XPBadge xp={concept.xp} />
        </div>
        <h1 className="text-2xl font-bold leading-tight">{concept.title}</h1>
        {done && (
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Lesson completed
          </div>
        )}
      </header>

      {/* Concept diagram */}
      <section className="card p-4">
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Concept Diagram
        </h2>
        <FlowDiagram diagram={concept.diagram} />
      </section>

      {/* Use case */}
      <section className="card space-y-3 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Real-world Use Case
        </h2>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-300">
            <Sparkles className="h-4 w-4" /> Scenario
          </div>
          <p className="text-sm text-slate-300">{concept.useCase.scenario}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-300">
            <Target className="h-4 w-4" /> Goal
          </div>
          <p className="text-sm text-slate-300">{concept.useCase.goal}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
            <Trophy className="h-4 w-4" /> Outcome
          </div>
          <p className="text-sm text-slate-300">{concept.useCase.outcome}</p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="card space-y-2 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Why It Matters
        </h2>
        <p className="text-sm text-slate-300">{concept.whyItMatters}</p>
      </section>

      <button className="btn-primary" onClick={finishLesson}>
        {done ? 'Go to Practice →' : 'Complete & Practice →'}
      </button>
    </div>
  )
}
