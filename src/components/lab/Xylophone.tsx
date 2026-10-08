import { useEffect, useState } from 'react'
import { playMallet } from '@/lib/audio'

const BARS = [
  { m: 72, name: 'دو', color: '#ef4444' },
  { m: 74, name: 'ري', color: '#f97316' },
  { m: 76, name: 'مي', color: '#eab308' },
  { m: 77, name: 'فا', color: '#22c55e' },
  { m: 79, name: 'صول', color: '#06b6d4' },
  { m: 81, name: 'لا', color: '#3b82f6' },
  { m: 83, name: 'سي', color: '#8b5cf6' },
  { m: 84, name: 'دو', color: '#ec4899' },
]

export default function Xylophone() {
  const [hit, setHit] = useState<number | null>(null)

  const strike = (i: number) => {
    playMallet(BARS[i].m)
    setHit(i)
    setTimeout(() => setHit((h) => (h === i ? null : h)), 180)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const n = Number(e.code.replace('Digit', ''))
      if (e.code.startsWith('Digit') && n >= 1 && n <= 8 && !e.repeat) strike(n - 1)
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  return (
    <div>
      <div
        dir="ltr"
        className="relative rounded-[2rem] bg-gradient-to-b from-amber-700 to-amber-900 p-4 md:p-6 shadow-chunky select-none touch-none"
      >
        <div className="absolute inset-x-6 top-1/4 h-2 rounded bg-amber-950/50" />
        <div className="absolute inset-x-6 bottom-1/4 h-2 rounded bg-amber-950/50" />
        <div className="relative flex items-center justify-between gap-1.5 md:gap-3 h-64 md:h-72">
          {BARS.map((b, i) => (
            <button
              key={i}
              aria-label={b.name}
              onPointerDown={(e) => {
                e.preventDefault()
                strike(i)
              }}
              className="flex-1 rounded-2xl flex flex-col items-center justify-between py-3 text-white font-extrabold transition-transform"
              style={{
                height: `${100 - i * 6}%`,
                background: `linear-gradient(to bottom, ${b.color}, ${b.color}cc)`,
                boxShadow: `inset 0 -6px 0 #0003, 0 4px 0 #0004`,
                transform: hit === i ? 'scale(0.94) rotate(-2deg)' : undefined,
              }}
            >
              <span className="w-3 h-3 rounded-full bg-white/70" />
              <span className="text-lg md:text-2xl drop-shadow">{b.name}</span>
              <span className="w-3 h-3 rounded-full bg-white/70" />
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-ink/55 mt-3">
        💡 القطعة الأطول صوتها أغلظ، والأقصر صوتها أحدّ. على الحاسوب استخدم الأرقام 1 إلى 8.
      </p>
    </div>
  )
}
