import { useEffect, useState } from 'react'
import { playDrum, setMasterVolume, type DrumKind } from '@/lib/audio'

export const DRUMS: { kind: DrumKind; name: string; desc: string; emoji: string; color: string }[] = [
  { kind: 'rahmani', name: 'الرحماني', desc: 'طبل كبير · صوت غليظ', emoji: '🥁', color: 'from-red-400 to-orange-500' },
  { kind: 'kasir', name: 'الكاسر', desc: 'طبل صغير · صوت حاد', emoji: '🪘', color: 'from-amber-400 to-yellow-400' },
  { kind: 'tar', name: 'الطار', desc: 'دف دائري', emoji: '⭕', color: 'from-emerald-400 to-teal-500' },
  { kind: 'msondo', name: 'المسندو', desc: 'طبل طويل', emoji: '🛢️', color: 'from-sky-400 to-blue-500' },
  { kind: 'clap', name: 'التصفيق', desc: 'بالأيدي', emoji: '👏', color: 'from-pink-400 to-rose-500' },
  { kind: 'tambourine', name: 'الجلاجل', desc: 'خشخشة', emoji: '🔔', color: 'from-violet-400 to-purple-500' },
]

export default function DrumPad() {
  const [hit, setHit] = useState<number | null>(null)
  const [volume, setVolume] = useState(0.8)

  useEffect(() => setMasterVolume(volume), [volume])
  useEffect(() => () => setMasterVolume(0.8), [])

  const strike = (i: number) => {
    playDrum(DRUMS[i].kind)
    setHit(i)
    setTimeout(() => setHit((h) => (h === i ? null : h)), 150)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const n = Number(e.code.replace('Digit', ''))
      if (e.code.startsWith('Digit') && n >= 1 && n <= 6 && !e.repeat) strike(n - 1)
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-amber-50 p-4 mb-5">
        <span className="font-extrabold">🔈 ضعيف</span>
        <input
          type="range"
          min={0.15}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 min-w-40 accent-orange-500 h-3"
          aria-label="قوة الصوت"
        />
        <span className="font-extrabold">قوي 🔊</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 select-none touch-none">
        {DRUMS.map((d, i) => (
          <button
            key={d.kind}
            onPointerDown={(e) => {
              e.preventDefault()
              strike(i)
            }}
            className={`aspect-square rounded-[2rem] bg-gradient-to-br ${d.color} text-white flex flex-col items-center justify-center gap-1 shadow-chunky transition-transform`}
            style={{ transform: hit === i ? 'scale(0.92)' : undefined }}
          >
            <span className={`text-5xl md:text-6xl ${hit === i ? 'animate-pop' : ''}`}>{d.emoji}</span>
            <span className="text-xl md:text-2xl font-extrabold">{d.name}</span>
            <span className="text-xs md:text-sm font-semibold text-white/85">{d.desc}</span>
            <span className="hidden md:block text-xs bg-white/25 rounded-full px-2 mt-1">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
