export default function StarRow({ value, size = 'text-xl' }: { value: number; size?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${size}`} aria-label={`${value} من 3 نجوم`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= value ? '' : 'grayscale opacity-25'}>
          ⭐
        </span>
      ))}
    </span>
  )
}
