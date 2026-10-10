import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guide')({
  component: PlatformGuide,
})

const lessonParts = [
  { icon: '📖', title: '١. التعرّف على الدرس', text: 'ابدأ بعنوان الدرس ومقدمته لتعرف الفكرة والمهارة الموسيقية التي ستتعلّمها.' },
  { icon: '🎬', title: '٢. الشرح والتعلّم', text: 'استمع إلى شرح المعلم الافتراضي أو شاهد فيديو الدرس إذا كان متاحًا.' },
  { icon: '🧠', title: '٣. الأسئلة والتقويم', text: 'أجب عن الأسئلة التفاعلية، وتعرّف على نتيجتك وتقدّمك.' },
  { icon: '✂️', title: '٤. الأنشطة والتطبيقات', text: 'نفّذ الأنشطة المصاحبة للدرس، ومنها أنشطة الكتاب أو الأنشطة الوطنية عندما تكون موجودة.' },
  { icon: '🎹', title: '٥. التطبيق أو المختبر الموسيقي', text: 'انتقل إلى التطبيق العملي أو المختبر لتجرّب النغمات والإيقاعات والآلات الموسيقية.' },
]

const steps = [
  ['🎓', 'اختر الصف', 'من الصفحة الرئيسية اختر صفك الدراسي.'],
  ['📚', 'افتح الدرس', 'اختر الوحدة ثم الدرس الذي تريد تعلّمه.'],
  ['🎬', 'شاهد الشرح', 'اقرأ المقدمة واستمع إلى الشرح أو شاهد الفيديو المتاح.'],
  ['✅', 'أجب عن الأسئلة', 'حلّ الأسئلة التفاعلية وتابع تقدّمك.'],
  ['🎨', 'نفّذ الأنشطة', 'جرّب الأنشطة الموجودة في الدرس واتبع التعليمات.'],
  ['🎹', 'انتقل إلى التطبيق أو المختبر', 'طبّق ما تعلّمته بالعزف والتجربة الموسيقية.'],
]

function PlatformGuide() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-sky-500 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">🎵 📘 🎹</div>
          <p className="inline-block rounded-full bg-white/20 px-4 py-1.5 font-bold mb-4">للطلاب وأولياء الأمور والمعلمين</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">دليل منصة نغماتي</h1>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-white/95">دليلك للتعرّف على محتويات المنصة، وفهم أجزاء الدرس، واستخدام الأنشطة والمختبر الموسيقي خطوة بخطوة.</p>
          <Link to="/" className="inline-flex mt-7 rounded-full bg-white text-violet-700 px-6 py-3 font-extrabold shadow-chunky">العودة إلى الصفحة الرئيسية ←</Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        <section>
          <div className="text-center mb-7">
            <span className="text-4xl">🧭</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-2">١. التعرّف على المنصة</h2>
            <p className="text-ink/65 text-lg">ماذا ستجد في نغماتي؟</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['📚', 'الصفوف والوحدات', 'اختر صفك للوصول إلى الوحدات والدروس المرتبطة به.'],
              ['🎬', 'شرح الدروس', 'مقدمات وشرح صوتي أو فيديو، بحسب المحتوى المتاح لكل درس.'],
              ['🧠', 'الأسئلة التفاعلية', 'أسئلة تساعد الطالب على مراجعة ما تعلّمه ومتابعة تقدّمه.'],
              ['🎨', 'الأنشطة التطبيقية', 'أنشطة مرتبطة بالدرس، وقد تتضمن أنشطة الكتاب أو التلوين والتوصيل.'],
              ['🎹', 'المختبر الموسيقي', 'أدوات للتجربة والعزف، مثل البيانو والإكسيليفون والإيقاعات.'],
              ['⭐', 'متابعة التقدّم', 'يمكن أن تظهر النجوم لتشجيع الطالب على التعلّم والاستمرار.'],
            ].map(([icon, title, description]) => (
              <article key={title} className="rounded-3xl bg-white p-5 shadow-chunky border-2 border-violet-50">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-extrabold mb-2">{title}</h3>
                <p className="text-ink/70 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-7">
            <span className="text-4xl">🧩</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-2">الأجزاء الخمسة في كل درس</h2>
            <p className="text-ink/65 text-lg">تعرّف على وظيفة كل جزء، مع ملاحظة أن التفاصيل قد تختلف من درس لآخر.</p>
          </div>
          <div className="space-y-4">
            {lessonParts.map((part, index) => (
              <article key={part.title} className="flex gap-4 items-start rounded-3xl bg-white p-5 md:p-6 shadow-chunky">
                <div className={`shrink-0 grid place-items-center w-14 h-14 rounded-2xl text-3xl ${index % 2 === 0 ? 'bg-amber-100' : 'bg-sky-100'}`}>{part.icon}</div>
                <div><h3 className="text-xl font-extrabold mb-1">{part.title}</h3><p className="text-ink/70 leading-relaxed">{part.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-7">
            <span className="text-4xl">🚀</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-2">٢. كيف أستخدم المنصة؟</h2>
            <p className="text-ink/65 text-lg">اتبع هذه الخطوات بالترتيب لتستفيد من الدرس.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map(([icon, title, description], index) => (
              <article key={title} className="relative rounded-3xl bg-gradient-to-br from-amber-50 to-white p-5 border-2 border-amber-100">
                <span className="absolute top-4 left-4 grid place-items-center w-8 h-8 rounded-full bg-violet-500 text-white font-extrabold">{index + 1}</span>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-extrabold mb-2">{title}</h3>
                <p className="text-ink/70 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-gradient-to-br from-sky-100 via-white to-pink-100 p-6 md:p-8">
          <div className="flex gap-3 items-center mb-5"><span className="text-4xl">💡</span><h2 className="text-3xl font-extrabold">٣. ملاحظات مهمة</h2></div>
          <ul className="space-y-4 text-lg leading-relaxed">
            <li className="flex gap-3"><span>🔹</span><span>قد تختلف الأنشطة أو مقاطع الفيديو من درس إلى آخر؛ لذلك لا يلزم أن تظهر جميع العناصر في كل درس.</span></li>
            <li className="flex gap-3"><span>🔹</span><span>اتبع التعليمات الظاهرة بجانب كل نشاط قبل البدء فيه.</span></li>
            <li className="flex gap-3"><span>🔹</span><span>يتم تسليم أنشطة الكتاب للمعلمة وفق الطريقة والتعليمات الموضّحة في المنصة.</span></li>
            <li className="flex gap-3"><span>🔹</span><span>يمكن لولي الأمر مساعدة الطالب في قراءة التعليمات، بينما يُشجَّع الطالب على الإجابة والتجربة بنفسه.</span></li>
          </ul>
        </section>

        <section className="text-center rounded-[2rem] bg-violet-600 text-white p-7 md:p-9">
          <div className="text-5xl mb-3">🎶</div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">جاهز لرحلتك الموسيقية؟</h2>
          <p className="text-white/90 mb-6">اختر صفك وابدأ التعلّم والاستكشاف والتطبيق مع نغماتي.</p>
          <Link to="/" className="inline-flex rounded-full bg-amber-300 hover:bg-amber-400 text-ink px-7 py-3 font-extrabold">ابدأ التعلّم الآن ←</Link>
        </section>
      </div>
    </main>
  )
}
