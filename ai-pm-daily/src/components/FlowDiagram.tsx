import { ArrowDown } from 'lucide-react'
import type { Diagram, DiagramNode } from '../content/types'

const TONES: Record<DiagramNode['tone'], string> = {
  blue: 'bg-sky-500/15 border-sky-400/40 text-sky-100',
  green: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100',
  amber: 'bg-amber-500/15 border-amber-400/40 text-amber-100',
  violet: 'bg-violet-500/15 border-violet-400/40 text-violet-100',
  slate: 'bg-slate-500/15 border-slate-400/40 text-slate-100',
}

/**
 * Renders a concept flow as a vertical stack of tinted node chips with arrows
 * between them. Edges are assumed linear (node[i] -> node[i+1]) which matches
 * the seed content; extra edges are ignored for the MVP.
 */
export default function FlowDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      {diagram.nodes.map((node, i) => (
        <div key={node.id} className="flex w-full flex-col items-center">
          <div
            className={`w-full max-w-[16rem] rounded-xl border px-4 py-2.5 text-center ${TONES[node.tone]}`}
          >
            <div className="text-sm font-semibold leading-tight">{node.label}</div>
            {node.sub && <div className="text-[11px] opacity-80">{node.sub}</div>}
          </div>
          {i < diagram.nodes.length - 1 && (
            <ArrowDown className="my-1 h-4 w-4 text-slate-500" aria-hidden />
          )}
        </div>
      ))}
    </div>
  )
}
