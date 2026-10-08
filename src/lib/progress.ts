import { useEffect, useState } from 'react'

// يحفظ نجوم الطالب على جهازه فقط (بدون حسابات أو تسجيل دخول).
const KEY = 'music-skills-stars-v1'
const EVENT = 'music-skills-progress'

type Stars = Record<string, number>

function read(): Stars {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function lessonKey(gradeId: string, lessonId: string) {
  return `${gradeId}/${lessonId}`
}

export function saveStars(key: string, stars: number) {
  const all = read()
  if ((all[key] ?? 0) >= stars) return
  all[key] = stars
  localStorage.setItem(KEY, JSON.stringify(all))
  window.dispatchEvent(new Event(EVENT))
}

export function useStars() {
  const [stars, setStars] = useState<Stars>({})
  useEffect(() => {
    const update = () => setStars(read())
    update()
    window.addEventListener(EVENT, update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener('storage', update)
    }
  }, [])
  return stars
}
