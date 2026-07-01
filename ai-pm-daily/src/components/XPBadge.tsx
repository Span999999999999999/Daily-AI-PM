import { Zap } from 'lucide-react'

export default function XPBadge({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-400">
      <Zap className="h-3.5 w-3.5" />
      {xp} XP
    </span>
  )
}
