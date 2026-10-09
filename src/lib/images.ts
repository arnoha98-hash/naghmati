
/** مسارات الصور المباشرة المناسبة للنشر على GitHub Pages */
export function img(path: string, _width?: number) {
  const cleanPath = path.replace(/^\/+/, '')
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`
}
