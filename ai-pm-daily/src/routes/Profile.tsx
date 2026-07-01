import { useState } from 'react'
import { Trash2, Info } from 'lucide-react'
import { useAppStore } from '../state/useAppStore'
import { levelInfo } from '../lib/xp'

export default function Profile() {
  const { xp, streak, completedLessons, completedChallenges, reset } = useAppStore()
  const lvl = levelInfo(xp)
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-sm text-slate-400">Your AI PM journey.</p>
      </header>

      <section className="card flex items-center gap-4 p-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-2xl">
          🧠
        </div>
        <div>
          <div className="font-semibold">AI PM in training</div>
          <div className="text-sm text-slate-400">
            Level {lvl.level} · {streak}-day streak
          </div>
        </div>
      </section>

      <section className="card grid grid-cols-3 divide-x divide-ink-700 p-0 text-center">
        <div className="p-4">
          <div className="text-lg font-bold">{xp}</div>
          <div className="text-[11px] text-slate-400">Total XP</div>
        </div>
        <div className="p-4">
          <div className="text-lg font-bold">{completedLessons.length}</div>
          <div className="text-[11px] text-slate-400">Lessons</div>
        </div>
        <div className="p-4">
          <div className="text-lg font-bold">{completedChallenges.length}</div>
          <div className="text-[11px] text-slate-400">Challenges</div>
        </div>
      </section>

      <section className="card space-y-2 p-4 text-sm text-slate-400">
        <div className="flex items-center gap-2 font-semibold text-slate-200">
          <Info className="h-4 w-4" /> About
        </div>
        <p>
          AI PM Daily is a personal, offline learning app. Progress is stored on this device only.
          New lessons appear as they’re added to the content library.
        </p>
      </section>

      <section className="space-y-2">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/40 px-4 py-3 text-sm font-semibold text-red-300 transition active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" /> Reset all progress
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-sm text-slate-300">
              This clears XP, streak, and completions. Are you sure?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-xl border border-ink-600 px-4 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  reset()
                  setConfirming(false)
                }}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
