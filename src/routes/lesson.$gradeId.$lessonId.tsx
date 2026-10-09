import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getLesson } from '@/content/curriculum'
import { gradeTheme } from '@/lib/theme'
import { lessonKey } from '@/lib/progress'
import TeacherPanel from '@/components/TeacherPanel'
import PreLessonActivity from '@/components/PreLessonActivity'
import Quiz from '@/components/Quiz'
import ActivityCard, { isActivityReady } from '@/components/ActivityCard'

export const Route = createFileRoute('/lesson/$gradeId/$lessonId')({
  loader: ({ params }) => {
    if (!getLesson(params.gradeId, params.lessonId)) throw notFound()
    return params
  },
  head: ({ params }) => ({
    meta: [{ title: `${getLesson(params.gradeId, params.lessonId)?.lesson.title ?? 'درس'} — نغماتي` }],
  }),
  component: LessonPage,
})

const steps = [
  { id: 'warmup', n: 1, label: 'تهيّأ', emoji: '💡' },
  { id: 'watch', n: 2, label: 'شاهد وتعلّم', emoji: '🎬' },
  { id: 'quiz', n: 3, label: 'أجب عن الأسئلة', emoji: '🃏' },
  { id: 'practice', n: 4, label: 'طبّق والعب', emoji: '🎮' },
]

function LessonPage() {
  const { gradeId, lessonId } = Route.useLoaderData()
  const { grade, unit, lesson, prev, prevUnit, next, nextUnit } = getLesson(gradeId, lessonId)!
  const t = gradeTheme[grade.theme]
  const activities = lesson.activities.filter(isActivityReady)

  return (
    <div>
      <section className={`bg-gradient-to-br ${t.hero} text-white`}>
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-16">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold mb-5">
            <Link to="/" className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/35">
              الرئيسية
            </Link>
            <span>←</span>
            <Link
              to="/grade/$gradeId"
              params={{ gradeId: grade.id }}
              className="rounded-full bg-white/25 px-3 py-1 hover:bg-white/35"
            >
              {grade.title}
            </Link>
            <span>←</span>
            <span className="rounded-full bg-white/15 px-3 py-1">{unit.title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/25 text-5xl md:text-6xl shrink-0">
              {lesson.emoji}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-sm">{lesson.title}</h1>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {lesson.objectives.map((o) => (
              <span key={o} className="rounded-2xl bg-white/20 px-4 py-2 font-semibold">
                🎯 {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* شريط الخطوات */}
      <div className="max-w-5xl mx-auto px-4 -mt-9 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 rounded-[2rem] bg-white p-2 md:p-3 shadow-chunky">
          {steps.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 rounded-3xl px-2 py-3 hover:bg-cream transition text-center"
            >
              <span className="text-3xl">{s.emoji}</span>
              <span className="font-extrabold text-sm md:text-lg leading-tight">
                <span className="text-ink/40">{s.n}. </span>
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">
        <section id="warmup" className="scroll-mt-24">
          <PreLessonActivity lesson={lesson} />
        </section>

        <section id="watch" className="scroll-mt-24">
          <SectionTitle n={2} title="شاهد وتعلّم مع المعلم" emoji="🎬" />
          <TeacherPanel lesson={lesson} />
        </section>

        <section id="quiz" className="scroll-mt-24">
          <SectionTitle n={3} title="أسئلة تفاعلية" emoji="🃏" sub="اختر البطاقة الصحيحة واجمع النجوم!" />
          <Quiz key={lesson.id} questions={lesson.quiz} progressKey={lessonKey(grade.id, `${unit.id}-${lesson.id}`)} />
        </section>

        <section id="practice" className="scroll-mt-24">
          <SectionTitle n={4} title="التطبيق والأنشطة الموسيقية" emoji="🎮" />
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((a, i) => (
                <ActivityCard key={i} activity={a} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-chunky">
              <div className="text-6xl mb-3">🎤</div>
              <p className="text-xl font-bold">نشاط هذا الدرس يكون معاً في الفصل مع معلمك!</p>
              <Link to="/lab" className="inline-block mt-5 rounded-full bg-amber-400 px-6 py-3 font-extrabold shadow-chunky">
                أو جرّب المختبر الموسيقي 🎹
              </Link>
            </div>
          )}
        </section>

        <nav className="grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to="/lesson/$gradeId/$lessonId"
              params={{ gradeId: grade.id, lessonId: `${prevUnit?.id ?? unit.id}-${prev.id}` }}
              className="rounded-3xl bg-white p-4 md:p-5 shadow-chunky hover:-translate-y-0.5 transition"
            >
              <span className="text-sm font-bold text-ink/50">→ الدرس السابق</span>
              <span className="block text-lg md:text-xl font-extrabold">
                {prev.emoji} {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/lesson/$gradeId/$lessonId"
              params={{ gradeId: grade.id, lessonId: `${nextUnit?.id ?? unit.id}-${next.id}` }}
              className={`rounded-3xl ${t.button} text-white p-4 md:p-5 shadow-chunky hover:-translate-y-0.5 transition text-left`}
            >
              <span className="text-sm font-bold text-white/80">الدرس التالي ←</span>
              <span className="block text-lg md:text-xl font-extrabold">
                {next.emoji} {next.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/grade/$gradeId"
              params={{ gradeId: grade.id }}
              className={`rounded-3xl ${t.button} text-white p-4 md:p-5 shadow-chunky text-left`}
            >
              <span className="text-sm font-bold text-white/80">أنهيت كل الدروس 🎉</span>
              <span className="block text-lg md:text-xl font-extrabold">العودة إلى {grade.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}

function SectionTitle({ n, title, emoji, sub }: { n: number; title: string; emoji: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="grid place-items-center w-12 h-12 rounded-2xl bg-ink text-white text-xl font-extrabold shrink-0">
        {n}
      </span>
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold">
          {title} <span>{emoji}</span>
        </h2>
        {sub && <p className="text-ink/60">{sub}</p>}
      </div>
    </div>
  )
}
