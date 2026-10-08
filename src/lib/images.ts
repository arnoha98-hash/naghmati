/** رابط صورة مُحسّنة عبر Netlify Image CDN */
export function img(path: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}&fm=webp`
}
