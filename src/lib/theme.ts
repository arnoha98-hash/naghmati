import type { Grade } from '@/content/curriculum'

// أسماء الأصناف مكتوبة كاملة حتى يلتقطها Tailwind.
export const gradeTheme: Record<
  Grade['theme'],
  { hero: string; chip: string; button: string; ring: string; text: string; soft: string }
> = {
  coral: {
    hero: 'from-rose-400 via-orange-400 to-amber-300',
    chip: 'bg-rose-100 text-rose-700',
    button: 'bg-rose-500 hover:bg-rose-600 shadow-rose-300',
    ring: 'ring-rose-300',
    text: 'text-rose-600',
    soft: 'bg-rose-50',
  },
  ocean: {
    hero: 'from-sky-500 via-teal-400 to-emerald-300',
    chip: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-500 hover:bg-sky-600 shadow-sky-300',
    ring: 'ring-sky-300',
    text: 'text-sky-600',
    soft: 'bg-sky-50',
  },
}

export const unitColors = [
  { card: 'bg-amber-100 border-amber-300', badge: 'bg-amber-400', icon: 'bg-amber-200' },
  { card: 'bg-violet-100 border-violet-300', badge: 'bg-violet-500', icon: 'bg-violet-200' },
  { card: 'bg-emerald-100 border-emerald-300', badge: 'bg-emerald-500', icon: 'bg-emerald-200' },
  { card: 'bg-pink-100 border-pink-300', badge: 'bg-pink-500', icon: 'bg-pink-200' },
]
