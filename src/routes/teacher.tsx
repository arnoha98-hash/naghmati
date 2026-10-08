import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { grades } from '@/content/curriculum'
import { toEmbedUrl, providerName } from '@/lib/embed'

export const Route = createFileRoute('/teacher')({
  head: () => ({ meta: [{ title: 'دليل المعلم — نغماتي' }] }),
  component: TeacherGuide,
})

const lessonExample = `{
  id: 'my-new-lesson',            // معرّف بالإنجليزية بدون مسافات
  title: 'عنوان الدرس',
  emoji: '🎵',
  objectives: ['الهدف الأول', 'الهدف الثاني'],
  intro: ['جملة يقولها المعلم الافتراضي', 'جملة ثانية'],
  teacher: { url: 'https://www.youtube.com/watch?v=XXXX' },
  quiz: [
    {
      question: 'نص السؤال؟',
      emoji: '🥁',
      options: ['خيار 1', 'خيار 2', 'خيار 3'],
      answer: 0,                    // رقم الإجابة الصحيحة (يبدأ من 0)
      hint: 'تلميح اختياري',
    },
  ],
  activities: [
    { type: 'lab', tool: 'piano', title: 'اعزف', description: '...' },
    { type: 'wordwall', url: 'https://wordwall.net/ar/resource/12345', title: 'لعبة', description: '...' },
    { type: 'musiclab', url: 'https://musiclab.chromeexperiments.com/Rhythm/', title: 'إيقاع', description: '...' },
  ],
},`

function TeacherGuide() {
  const [link, setLink] = useState('')
  const embed = toEmbedUrl(link)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <header className="text-center">
        <div className="text-6xl mb-3">👩‍🏫</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">دليل المعلم</h1>
        <p className="text-lg text-ink/65 max-w-2xl mx-auto">
          كل محتوى المنصة (الوحدات، الدروس، الأسئلة، الفيديوهات، والأنشطة) موجود في ملف واحد هو{' '}
          <code dir="ltr" className="rounded-lg bg-ink/5 px-2 py-0.5 font-mono text-base">
            src/content/curriculum.ts
          </code>
          . عدّله وانشر التغييرات لتظهر للطلاب مباشرة.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { e: '🎬', t: 'فيديو المعلم', d: 'الصق رابط YouTube أو Genially في الحقل teacher.url. إن تركته فارغاً تشرح الشخصية الكرتونية الدرس.' },
          { e: '🃏', t: 'الأسئلة', d: 'أضف سؤالاً في quiz مع الخيارات ورقم الإجابة الصحيحة. يمكن إضافة رمز تعبيري وتلميح.' },
          { e: '🎮', t: 'الأنشطة', d: 'أضف أداة من المختبر، أو تجربة Chrome Music Lab، أو لعبة Wordwall. النشاط بدون رابط لا يظهر للطلاب.' },
        ].map((c) => (
          <div key={c.t} className="rounded-3xl bg-white p-6 shadow-chunky">
            <div className="text-4xl mb-2">{c.e}</div>
            <h2 className="text-xl font-extrabold mb-1">{c.t}</h2>
            <p className="text-ink/65">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 md:p-8 shadow-chunky">
        <h2 className="text-2xl font-extrabold mb-2">🔗 أداة فحص الروابط</h2>
        <p className="text-ink/65 mb-4">
          الصق رابط فيديو YouTube أو عرض Genially أو لعبة Wordwall لمعاينة شكله داخل الدرس. يمكنك لصق الرابط العادي كما
          هو في ملف المحتوى، وستحوّله المنصة تلقائياً.
        </p>
        <input
          dir="ltr"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-2xl border-2 border-ink/15 focus:border-violet-400 outline-none px-4 py-3 text-lg"
        />
        {link && !embed && <p className="mt-3 font-bold text-rose-600">الرابط غير صالح، تأكد من نسخه كاملاً.</p>}
        {embed && (
          <div className="mt-4">
            <p className="font-bold mb-2">
              ✅ {providerName(embed)} — رابط التضمين:{' '}
              <code dir="ltr" className="text-sm bg-ink/5 rounded px-2 py-0.5 break-all">
                {embed}
              </code>
            </p>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-ink/5">
              <iframe src={embed} title="معاينة" className="absolute inset-0 w-full h-full" allowFullScreen />
            </div>
          </div>
        )}
      </section>

      <section className="rounded-[2rem] bg-ink text-white p-6 md:p-8 shadow-chunky">
        <h2 className="text-2xl font-extrabold mb-2">➕ قالب درس جديد</h2>
        <p className="text-white/70 mb-4">
          انسخ هذا القالب وضعه داخل قائمة lessons في الوحدة المناسبة. لإضافة وحدة جديدة أضف عنصراً في قائمة units.
          أدوات المختبر المتاحة: piano · xylophone · drums · rhythm
        </p>
        <pre dir="ltr" className="overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm leading-relaxed text-left">
          <code>{lessonExample}</code>
        </pre>
      </section>

      <section className="rounded-[2rem] bg-white p-6 md:p-8 shadow-chunky">
        <h2 className="text-2xl font-extrabold mb-4">📋 حالة المحتوى</h2>
        <div className="space-y-8">
          {grades.map((g) => (
            <div key={g.id}>
              <h3 className="text-xl font-extrabold mb-3">
                {g.emoji} {g.title}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-start min-w-[560px]">
                  <thead>
                    <tr className="text-ink/55 text-sm">
                      <th className="text-start py-2">الدرس</th>
                      <th className="py-2">فيديو المعلم</th>
                      <th className="py-2">الأسئلة</th>
                      <th className="py-2">الأنشطة الجاهزة</th>
                      <th className="py-2">تنتظر رابطاً</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.units.flatMap((u) =>
                      u.lessons.map((l) => {
                        const pending = l.activities.filter((a) => a.type !== 'lab' && !a.url).length
                        return (
                          <tr key={l.id} className="border-t border-ink/10 text-center">
                            <td className="py-2 text-start">
                              <Link
                                to="/lesson/$gradeId/$lessonId"
                                params={{ gradeId: g.id, lessonId: l.id }}
                                className="font-bold hover:text-violet-600"
                              >
                                {l.emoji} {l.title}
                              </Link>
                            </td>
                            <td>{l.teacher.url ? '✅' : '🙂 شخصية كرتونية'}</td>
                            <td>{l.quiz.length}</td>
                            <td>{l.activities.length - pending}</td>
                            <td>{pending > 0 ? `⏳ ${pending}` : '—'}</td>
                          </tr>
                        )
                      }),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
