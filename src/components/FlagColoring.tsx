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
      <svg viewBox="0 0 360 210" role="img" aria-label="مساحة تلوين تفاعلية لعلم سلطنة عُمان" className="w-full max-w-xl mx-auto block rounded-xl border border-ink/10">
        <rect x="10" y="10" width="340" height="190" rx="4" fill="#fff" stroke="#555" strokeWidth="2" />
        <rect x="10" y="10" width="78" height="190" fill={fills.pole ?? '#d8232a'} stroke="#555" strokeWidth="2" onClick={() => paint('pole')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="10" width="262" height="63" fill={fills.top ?? '#fff'} stroke="#555" strokeWidth="2" onClick={() => paint('top')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="73" width="262" height="64" fill={fills.middle ?? '#d8232a'} stroke="#555" strokeWidth="2" onClick={() => paint('middle')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="137" width="262" height="63" fill={fills.bottom ?? '#00843d'} stroke="#555" strokeWidth="2" onClick={() => paint('bottom')} style={{ cursor: 'pointer' }} />
        <g transform="translate(49 43)" pointerEvents="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-25 -24 L-5 1 L-8 6 L-28 -20 Z" fill="#fff"/><path d="M25 -24 L5 1 L8 6 L28 -20 Z" fill="#fff"/>
          <path d="M-17 -8 L-9 -2 M17 -8 L9 -2" fill="none"/>
          <path d="M-27 -1 L27 -1 M-20 -5 L-20 3 M20 -5 L20 3" fill="none" strokeWidth="3"/>
          <path d="M-5 -20 Q0 -25 5 -20 L3 -10 L-3 -10 Z" fill="#fff"/>
          <path d="M-3 -10 L-4 4 L-7 11 L0 16 L7 11 L4 4 L3 -10 Z" fill="#fff"/>
          <path d="M0 -18 L0 -10 M-4 -1 L4 -1 M-4 4 L4 4" fill="none" stroke="#d8232a" strokeWidth="1.4"/>
          <circle cx="0" cy="-23" r="3" fill="#fff"/><path d="M-4 16 L0 21 L4 16" fill="none"/>
        </g>
      </svg>
    </div>
  )
}
