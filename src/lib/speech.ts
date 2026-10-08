// قراءة النص بصوت عربي باستخدام خاصية النطق في المتصفح (مفيد لطلاب الصف الأول).

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speak(text: string, onEnd?: () => void) {
  if (!canSpeak()) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ar-SA'
  u.rate = 0.9
  u.pitch = 1.1
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith('ar'))
  if (voice) u.voice = voice
  if (onEnd) u.onend = onEnd
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel()
}
