import { useEffect, useRef, useState } from 'react'
import { getAudio, playDrum, type DrumKind } from '@/lib/audio'

const ROWS: { kind: DrumKind; name: string; emoji: string; on: string }[] = [
  { kind: 'rahmani', name: 'الرحماني', emoji: '🥁', on: 'bg-red-400' },
  { kind: 'kasir', name: 'الكاسر', emoji: '🪘', on: 'bg-amber-400' },
  { kind: 'tar', name: 'الطار', emoji: '⭕', on: 'bg-emerald-400' },
  { kind: 'clap', name: 'التصفيق', emoji: '👏', on: 'bg-pink-400' },
]
const STEPS = 8

type Grid = boolean[][]
const empty = (): Grid => ROWS.map(() => Array(STEPS).fill(false))
const fromStr = (rows: string[]): Grid => rows.map((r) => r.split('').map((c) => c === 'x'))

const PRESETS: { name: string; grid: Grid; bpm: number }[] = [
  { name: 'نبض ثابت', bpm: 90, grid: fromStr(['x.x.x.x.', '........', '........', '........']) },
  { name: 'تصفيق الأنشودة', bpm: 100, grid: fromStr(['x...x...', '........', '........', 'x.x.x.xx']) },
  { name: 'ميزان رباعي', bpm: 100, grid: fromStr(['x.......', '..x.x.x.', '........', '........']) },
  { name: 'إيقاع شعبي مبسّط', bpm: 110, grid: fromStr(['x..x..x.', '..x...xx', 'x.x.x.x.', '....x...']) },
]

export default function RhythmMaker() {
  const [grid, setGrid] = useState<Grid>(() => PRESETS[0].grid)
  const [bpm, setBpm] = useState(90)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(-1)
  const gridRef = useRef(grid)
  const bpmRef = useRef(bpm)
  gridRef.current = grid
  bpmRef.current = bpm

  // جدولة دقيقة للأصوات باستخدام ساعة Web Audio
  useEffect(() => {
    if (!playing) {
      setCurrent(-1)
      return
    }
    const a = getAudio()
    if (!a) return
    let step = 0
    let nextTime = a.ctx.currentTime + 0.05
    const timeouts: number[] = []
    const timer = window.setInterval(() => {
      while (nextTime < a.ctx.currentTime + 0.12) {
        const s = step
        gridRef.current.forEach((row, r) => row[s] && playDrum(ROWS[r].kind, nextTime))
        const delay = Math.max(0, (nextTime - a.ctx.currentTime) * 1000)
        timeouts.push(window.setTimeout(() => setCurrent(s), delay))
        nextTime += 60 / bpmRef.current / 2
        step = (step + 1) % STEPS
      }
    }, 25)
    return () => {
      clearInterval(timer)
      timeouts.forEach(clearTimeout)
    }
  }, [playing])

  const toggle = (r: number, s: number) => {
    setGrid((g) => g.map((row, ri) => (ri === r ? row.map((v, si) => (si === s ? !v : v)) : row)))
    if (!grid[r][s]) playDrum(ROWS[r].kind)
  }

  const speedLabel = bpm < 80 ? '🐢 بطيء' : bpm > 130 ? '🐇 سريع' : '🚶 متوسط'

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => {
              setGrid(p.grid)
              setBpm(p.bpm)
            }}
            className="rounded-full bg-white border-2 border-ink/10 hover:border-sky-400 px-4 py-2 font-bold"
          >
            {p.name}
          </button>
        ))}
        <button onClick={() => setGrid(empty())} className="rounded-full bg-ink/5 px-4 py-2 font-bold">
          🧹 مسح
        </button>
      </div>

      <div className="rounded-[2rem] bg-ink p-3 md:p-5 shadow-chunky overflow-x-auto">
        <div dir="ltr" className="min-w-[560px] space-y-2.5">
          <div className="grid grid-cols-[110px_repeat(8,1fr)] gap-2 text-center text-white/60 font-bold text-sm">
            <span />
            {Array.from({ length: STEPS }).map((_, s) => (
              <span key={s} className={s % 2 === 0 ? 'text-white' : ''}>
                {s % 2 === 0 ? s / 2 + 1 : '·'}
              </span>
            ))}
          </div>
          {ROWS.map((row, r) => (
            <div key={row.kind} className="grid grid-cols-[110px_repeat(8,1fr)] gap-2">
              <span dir="rtl" className="flex items-center gap-2 text-white font-extrabold">
                <span className="text-2xl">{row.emoji}</span>
                {row.name}
              </span>
              {grid[r].map((on, s) => (
                <button
                  key={s}
                  onClick={() => toggle(r, s)}
                  aria-label={`${row.name} ضربة ${s + 1}`}
                  aria-pressed={on}
                  className={[
                    'aspect-square rounded-2xl transition',
                    on ? `${row.on} shadow-[inset_0_-4px_0_#0003]` : s % 4 < 2 ? 'bg-white/15' : 'bg-white/8',
                    current === s ? 'ring-4 ring-yellow-300 scale-105' : '',
                  ].join(' ')}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-5">
        <button
          onClick={() => setPlaying((p) => !p)}
          className={`rounded-full px-8 py-3.5 text-xl font-extrabold text-white shadow-chunky ${playing ? 'bg-rose-500' : 'bg-emerald-500'}`}
        >
          {playing ? '⏹️ إيقاف' : '▶️ تشغيل'}
        </button>
        <div className="flex-1 min-w-60 flex items-center gap-3 rounded-3xl bg-sky-50 px-4 py-3">
          <span className="font-extrabold whitespace-nowrap">السرعة</span>
          <input
            type="range"
            min={60}
            max={180}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="flex-1 accent-sky-500 h-3"
            aria-label="السرعة"
          />
          <span className="font-extrabold whitespace-nowrap w-24 text-center">{speedLabel}</span>
        </div>
      </div>
      <p className="text-sm text-ink/55 mt-3">💡 كل مربعين يساويان نبضة واحدة (سوداء)، والمربع الواحد يساوي كروش.</p>
    </div>
  )
}
