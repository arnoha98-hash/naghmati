import { useState } from 'react'

const COLORS = [
  { name: 'أحمر', value: '#d8232a' },
  { name: 'أبيض', value: '#ffffff' },
  { name: 'أخضر', value: '#00843d' },
]

export default function FlagColoring() {
  const [color, setColor] = useState(COLORS[0].value)
  const [fills, setFills] = useState<Record<string, string>>({})
  const [eraser, setEraser] = useState(false)
  const paint = (part: string) => setFills((old) => ({ ...old, [part]: eraser ? '#ffffff' : color }))

  return (
    <div className="rounded-3xl bg-white p-4 md:p-5 border-2 border-amber-200">
      <h3 className="text-xl font-extrabold mb-2">🎨 لوّن علم عُمان</h3>
      <p className="text-ink/60 mb-3">اختَر لونًا ثم اضغط على جزء من العلم. يمكنك استخدام الممحاة أو مسح الألوان كلها.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {COLORS.map((c) => <button key={c.name} onClick={() => { setColor(c.value); setEraser(false) }} className={`rounded-full border-2 px-4 py-2 font-bold ${color === c.value && !eraser ? 'border-violet-500 ring-2 ring-violet-200' : 'border-ink/10'}`}><span className="inline-block w-4 h-4 rounded-full border border-ink/20 align-middle ml-2" style={{ background: c.value }} />{c.name}</button>)}
        <button onClick={() => setEraser(true)} className={`rounded-full border-2 px-4 py-2 font-bold ${eraser ? 'border-violet-500 bg-violet-100' : 'border-ink/10'}`}>🧽 ممحاة</button>
        <button onClick={() => setFills({})} className="rounded-full bg-ink/5 px-4 py-2 font-bold">↺ مسح الكل</button>
      </div>
      <svg viewBox="0 0 601 327" role="img" aria-label="نموذج تلوين علم سلطنة عُمان مع الشعار العُماني" className="w-full max-w-3xl mx-auto block rounded-xl border border-ink/10">
        <rect x="9" y="19" width="579" height="291" fill="#fff" stroke="#111" strokeWidth="2.5" />
        <rect x="9" y="19" width="193" height="291" fill={fills.pole ?? '#fff'} stroke="#111" strokeWidth="2" onClick={() => paint('pole')} style={{ cursor: 'pointer' }} />
        <rect x="202" y="19" width="386" height="97" fill={fills.top ?? '#fff'} stroke="#111" strokeWidth="2" onClick={() => paint('top')} style={{ cursor: 'pointer' }} />
        <rect x="202" y="116" width="386" height="96" fill={fills.middle ?? '#fff'} stroke="#111" strokeWidth="2" onClick={() => paint('middle')} style={{ cursor: 'pointer' }} />
        <rect x="202" y="212" width="386" height="98" fill={fills.bottom ?? '#fff'} stroke="#111" strokeWidth="2" onClick={() => paint('bottom')} style={{ cursor: 'pointer' }} />
        <g transform="translate(103 78) scale(1.02)" fill="none" stroke="#111" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
          <path d="M-15 -39 Q-12 -31 -9 -24 L-1 -7 L-4 3 L-9 13 L-18 28 L-24 35 L-17 36 L-3 23 L8 9 L12 2 L7 -6 L-3 -23 L-10 -38 Z"/>
          <path d="M15 -39 Q12 -31 9 -24 L1 -7 L4 3 L9 13 L18 28 L24 35 L17 36 L3 23 L-8 9 L-12 2 L-7 -6 L3 -23 L10 -38 Z"/>
          <path d="M-15 -37 L-10 -25 M15 -37 L10 -25 M-19 29 L-14 31 M19 29 L14 31"/>
          <path d="M-44 -8 L-14 -8 L-10 -4 L10 -4 L14 -8 L44 -8 L44 1 L14 1 L9 5 L-9 5 L-14 1 L-44 1 Z"/>
          <path d="M-40 -5 L-34 -5 M-27 -5 L-21 -5 M21 -5 L27 -5 M34 -5 L40 -5"/>
          <path d="M-8 -24 L-5 -29 L5 -29 L8 -24 L6 -17 L-6 -17 Z"/>
          <path d="M-6 -17 L-8 -10 L-7 1 L-12 8 L-8 18 L0 22 L8 18 L12 8 L7 1 L8 -10 L6 -17 Z" fill="#111"/>
          <path d="M-5 -27 L0 -32 L5 -27 M-4 -33 L-4 -37 L0 -40 L4 -37 L4 -33 M-2 -29 L-2 -24 M2 -29 L2 -24"/>
          <path d="M-7 -11 L7 -11 M-8 -7 L8 -7 M-9 -3 L9 -3 M-8 2 L8 2"/>
          <path d="M-8 7 L-14 12 L-9 17 M8 7 L14 12 L9 17"/>
          <path d="M-6 18 L-2 25 L0 29 L2 25 L6 18"/>
          <path d="M-13 -10 L-18 -14 L-28 -14 M13 -10 L18 -14 L28 -14"/>
          <path d="M-40 -11 L-36 -14 L-28 -11 L-28 -2 L-36 1 L-40 -2 Z M40 -11 L36 -14 L28 -11 L28 -2 L36 1 L40 -2 Z"/>
          <path d="M-23 -9 L-20 -6 L-23 -3 M23 -9 L20 -6 L23 -3"/>
        </g>
      </svg>
    </div>
  )
}
