import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Dumbbell, BarChart3, User } from 'lucide-react'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/learn', label: 'Learn', icon: BookOpen, end: false },
  { to: '/practice', label: 'Practice', icon: Dumbbell, end: false },
  { to: '/progress', label: 'Progress', icon: BarChart3, end: false },
  { to: '/profile', label: 'Profile', icon: User, end: false },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-ink-700/70 bg-ink-900/95 backdrop-blur">
      <div
        className="mx-auto flex max-w-md items-stretch justify-between px-2"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] transition ${
                isActive ? 'text-brand-400' : 'text-slate-500'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
