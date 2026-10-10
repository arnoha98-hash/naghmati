import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher')({
  head: () => ({ meta: [{ title: 'دليل المنصة — نغماتي' }, { name: 'description', content: 'دليل استخدام منصة نغماتي للطلاب وأولياء الأمور والمعلمين.' }] }),
  component: PlatformGuide,
})

const sections = [
  { icon: '📚', title: '١. الدروس التعليمية', description: 'تصفّح الدروس حسب الصف والوحدات، وتعرّف على أهداف كل درس ومحتواه.' },
  { icon: '🎬', title: '٢. شرح الدرس', description: 'شاهد فيديو شرح الدرس للتعرّف على المحتوى خطوة بخطوة.' },
  { icon: '🃏', title: '٣. الأسئلة التفاعلية', description: 'أجب عن أسئلة الدرس واختر الإجابة المناسبة، وتعرّف على نتيجتك وشاهد النجوم التشجيعية عند توفرها.' },
  { icon: '🎮', title: '٤. الأنشطة والتطبيقات', description: 'نفّذ الأنشطة والألعاب المرتبطة بالدرس لتراجع ما تعلمته وتطبّقه بطريقة ممتعة.' },
  { icon: '🎹', title: '٥. المختبر الموسيقي', description: 'جرّب البيانو والإكسيليفون والطبول وصانع الإيقاع، واستكشف الأصوات والإيقاعات بنفسك.' },
]

const steps = [
  { icon: '🎓', title: 'اختر الصف', description: 'من الصفحة الرئيسية، اختر الصف الدراسي المناسب.' },
  { icon: '📖', title: 'افتح الدرس', description: 'اختر الوحدة ثم افتح الدرس الذي تريد تعلمه.' },
  { icon: '▶️', title: 'شاهد الشرح', description: 'شاهد فيديو شرح الدرس، ثم انتقل إلى الأسئلة والأنشطة للتطبيق.' },
  { icon: '✅', title: 'أجب عن الأسئلة', description: 'اقرأ الأسئلة بعناية واختر إجاباتك.' },
  { icon: '🧩', title: 'نفّذ الأنشطة', description: 'افتح الأنشطة الموجودة في الدرس واتبع التعليمات الظاهرة.' },
  { icon: '🎼', title: 'طبّق واستكشف', description: 'انتقل إلى التطبيق أو المختبر الموسيقي للتدريب والتجربة.' },
]

function PlatformGuide() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-violet-600 via-violet-500 to-sky-500 p-7 md:p-12 text-white shadow-chunky text-center">
        <div className="text-6xl md:text-7xl mb-4" aria-hidden>🎵📘</div>
        <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 font-bold mb-4">أهلًا بكم في نغماتي</p>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">دليل منصة نغماتي</h1>
        <p className="text-lg font-extrabold text-white/95 mb-4">إعداد المعلمة: مي العسكري</p>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          دليلكم للتعلّم والاستكشاف والتطبيق الموسيقي. هذا الدليل مخصص للطلاب وأولياء الأمور والمعلمين للتعرّف على أقسام المنصة وطريقة استخدامها.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <a href="#platform" className="rounded-full bg-white text-violet-700 px-6 py-3 font-extrabold hover:scale-105 transition">تعرّف على المنصة ↓</a>
          <a href="#steps" className="rounded-full bg-white/20 text-white px-6 py-3 font-extrabold hover:bg-white/30 transition">خطوات الاستخدام</a>
        </div>
      </header>

      <section id="platform" className="scroll-mt-24 space-y-5">
        <div className="text-center">
          <span className="text-4xl">🧭</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-2">الجزء الأول: التعرّف على المنصة</h2>
          <p className="text-ink/65 text-lg">ماذا ستجد في كل درس وفي نغماتي؟</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-5 md:p-6 shadow-chunky border-2 border-ink/5 hover:-translate-y-1 transition">
              <div className="text-4xl mb-3" aria-hidden>{item.icon}</div>
              <h3 className="text-xl font-extrabold mb-2">{item.title}</h3>
              <p className="text-ink/65 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="steps" className="scroll-mt-24 rounded-[2rem] bg-white p-5 md:p-8 shadow-chunky space-y-6">
        <div className="text-center">
          <span className="text-4xl">🪜</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-2">الجزء الثاني: كيف أستخدم المنصة؟</h2>
          <p className="text-ink/65">اتبع الخطوات بالترتيب لتستفيد من الدرس كاملًا.</p>
        </div>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4 rounded-2xl bg-gradient-to-l from-violet-50 to-sky-50 p-4">
              <div className="shrink-0 grid place-items-center w-12 h-12 rounded-2xl bg-white text-2xl shadow-sm">{step.icon}</div>
              <div className="flex-1">
                <div className="font-extrabold text-lg">{index + 1}. {step.title}</div>
                <p className="text-ink/70 mt-1 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-2">
          <Link to="/" className="inline-block rounded-full bg-violet-500 hover:bg-violet-600 text-white px-7 py-3 font-extrabold shadow-chunky transition">العودة إلى الصفحة الرئيسية 🏠</Link>
        </div>
      </section>

      <section className="scroll-mt-24 space-y-5">
        <div className="text-center">
          <span className="text-4xl">💡</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-2">الجزء الثالث: ملاحظات مهمة</h2>
          <p className="text-ink/65">نصائح للطلاب وأولياء الأمور والمعلمين.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="rounded-3xl bg-amber-50 p-5 border-2 border-amber-100">
            <div className="text-3xl mb-2">ℹ️</div>
            <h3 className="font-extrabold text-lg mb-2">المحتوى يختلف حسب الدرس</h3>
            <p className="text-ink/75 leading-relaxed">قد تختلف الفيديوهات أو الأنشطة من درس لآخر؛ تظهر في كل درس المواد المتاحة له فقط.</p>
          </article>
          <article className="rounded-3xl bg-sky-50 p-5 border-2 border-sky-100">
            <div className="text-3xl mb-2">📩</div>
            <h3 className="font-extrabold text-lg mb-2">تسليم أنشطة الكتاب</h3>
            <p className="text-ink/75 leading-relaxed">عند وجود نشاط من الكتاب، اتبع تعليمات التسليم الظاهرة في المنصة، وسلّم العمل للمعلمة بالطريقة المحددة في النشاط.</p>
          </article>
          <article className="rounded-3xl bg-pink-50 p-5 border-2 border-pink-100">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="font-extrabold text-lg mb-2">التعاون في التعلّم</h3>
            <p className="text-ink/75 leading-relaxed">يمكن لولي الأمر مساعدة الطالب في التنقل بين الدروس، ويوجّه المعلم الطلاب إلى الأنشطة المطلوبة.</p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-l from-amber-200 via-pink-100 to-sky-200 p-6 md:p-8 text-center">
        <div className="text-4xl mb-2">🎶</div>
        <h2 className="text-2xl font-extrabold mb-2">هل أنت مستعد لبدء الرحلة؟</h2>
        <p className="text-ink/75 mb-5">اختر صفك، وافتح درسًا، ثم تعلّم وجرّب واعزف!</p>
        <p className="text-ink/70 font-bold mb-5">مع تحيات المعلمة مي العسكري، نتمنى لكم رحلة تعلّم موسيقية ممتعة 🎵</p>
        <Link to="/" className="inline-block rounded-full bg-ink text-white px-7 py-3 font-extrabold shadow-chunky hover:opacity-90 transition">ابدأ من الرئيسية 🚀</Link>
      </section>
    </div>
  )
}
