/**
 * يحوّل الروابط العادية (التي ينسخها المعلم من المتصفح) إلى روابط تضمين صالحة للـ iFrame.
 * يدعم: YouTube، Genially، Wordwall، وأي رابط آخر كما هو.
 */
export function toEmbedUrl(raw: string): string {
  const url = raw.trim()
  if (!url) return ''
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')

    if (host === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?rel=0`
    }
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const id =
        u.searchParams.get('v') ||
        u.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`
    }

    if (host.endsWith('genial.ly') || host.endsWith('genially.com')) {
      // https://view.genially.com/<id>/... → https://view.genially.com/<id>
      const id = u.pathname.split('/').filter(Boolean).find((p) => /^[a-f0-9]{24}$/i.test(p))
      if (id) return `https://view.genially.com/${id}`
    }

    if (host === 'wordwall.net') {
      // https://wordwall.net/ar/resource/12345/... → https://wordwall.net/embed/resource/12345
      if (u.pathname.includes('/embed/')) return url
      const id = u.pathname.match(/\/resource\/(\d+)/)?.[1]
      if (id) return `https://wordwall.net/embed/resource/${id}`
    }

    return url
  } catch {
    return ''
  }
}

export function providerName(url: string) {
  if (/youtu/.test(url)) return 'YouTube'
  if (/genial/.test(url)) return 'Genially'
  if (/wordwall/.test(url)) return 'Wordwall'
  if (/musiclab/.test(url)) return 'Chrome Music Lab'
  return 'رابط خارجي'
}
