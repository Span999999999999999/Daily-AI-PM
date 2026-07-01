interface Props {
  /** 0..1 */
  value: number
  className?: string
}

export default function ProgressBar({ value, className = '' }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-700 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
