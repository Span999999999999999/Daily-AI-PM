import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  value: string | number
  label: string
  iconClass?: string
}

export default function StatCard({ icon: Icon, value, label, iconClass = 'text-brand-400' }: Props) {
  return (
    <div className="card flex flex-col items-center gap-1 px-3 py-3 text-center">
      <Icon className={`h-5 w-5 ${iconClass}`} />
      <div className="text-lg font-bold leading-none">{value}</div>
      <div className="text-[11px] leading-tight text-slate-400">{label}</div>
    </div>
  )
}
