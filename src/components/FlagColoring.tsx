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
        <rect x="10" y="10" width="78" height="190" fill={fills.pole ?? '#fff'} stroke="#555" strokeWidth="2" onClick={() => paint('pole')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="10" width="262" height="63" fill={fills.top ?? '#fff'} stroke="#555" strokeWidth="2" onClick={() => paint('top')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="73" width="262" height="64" fill={fills.middle ?? '#fff'} stroke="#555" strokeWidth="2" onClick={() => paint('middle')} style={{ cursor: 'pointer' }} />
        <rect x="88" y="137" width="262" height="63" fill={fills.bottom ?? '#fff'} stroke="#555" strokeWidth="2" onClick={() => paint('bottom')} style={{ cursor: 'pointer' }} />
        <text x="49" y="111" textAnchor="middle" fontSize="30" fill="#333" pointerEvents="none">⚔</text>
      </svg>
    </div>
  )
}
