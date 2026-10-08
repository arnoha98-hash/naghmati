const notes = [
  { s: '♪', c: 'text-pink-400', pos: 'top-6 right-[8%]', d: '0s' },
  { s: '♫', c: 'text-sky-400', pos: 'top-24 left-[6%]', d: '1.2s' },
  { s: '♩', c: 'text-amber-400', pos: 'bottom-10 right-[18%]', d: '2.1s' },
  { s: '♬', c: 'text-violet-400', pos: 'bottom-16 left-[20%]', d: '0.6s' },
  { s: '𝄞', c: 'text-emerald-400', pos: 'top-1/2 right-[45%]', d: '3s' },
]

export default function FloatingNotes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {notes.map((n, i) => (
        <span
          key={i}
          className={`absolute text-5xl md:text-6xl opacity-60 animate-float ${n.c} ${n.pos}`}
          style={{ animationDelay: n.d }}
        >
          {n.s}
        </span>
      ))}
    </div>
  )
}
