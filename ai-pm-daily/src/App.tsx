import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import { useAppStore } from './state/useAppStore'
import Home from './routes/Home'
import Learn from './routes/Learn'
import LessonDetail from './routes/LessonDetail'
import Practice from './routes/Practice'
import Progress from './routes/Progress'
import Profile from './routes/Profile'

export default function App() {
  const registerVisit = useAppStore((s) => s.registerVisit)

  useEffect(() => {
    registerVisit()
  }, [registerVisit])

  return (
    <div className="mx-auto min-h-full max-w-md px-4 pt-6 tab-safe">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:conceptId" element={<LessonDetail />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:conceptId" element={<Practice />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
