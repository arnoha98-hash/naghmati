import { useState } from 'react'
import type { Lesson } from '@/content/curriculum'

type Warmup = { question: string; options: string[]; answer: number; clue?: string }
const warmups: Record<string, Warmup> = {
  'النشيد الوطني': { question: 'أيّ علم هو علم سلطنة عُمان؟', options: ['سلطنة عُمان', 'اليابان', 'فرنسا'], answer: 0, clue: 'لاحظ الألوان الثلاثة والشريط الأحمر بجانب السارية.' },
  'العلامة الإيقاعية النوار (♩) والسكتة المقابلة لها': { question: 'صفّق نبضة واحدة ثم توقّف: أي رمز يعبّر عن صوت النوار؟', options: ['♩ صوت مدته نبضة', '𝄽 سكتة', '🎹 آلة موسيقية', '🎼 مدرج'], answer: 0 },
  'الحِدّة والغلظة – السرعة والبطء': { question: 'أيّ زوج يوضح اختلاف طبقة الصوت؟', options: ['صوت عصفور وصوت طبل غليظ', 'صوتان متطابقان', 'صمت وصمت', 'لونان مختلفان'], answer: 0 },
  'اللعبة الشعبية (حبّوه موه تدوري)': { question: 'ما الذي يجعل اللعبة الشعبية الجماعية ممتعة؟', options: ['حركة وغناء بتناسق', 'كل شخص يتحرك وحده بلا إيقاع', 'الجلوس طوال الوقت', 'تجاهل المجموعة'], answer: 0 },
  'المدرج الموسيقي ومفتاح صول': { question: 'كم خطًا يتكوّن منه المدرج الموسيقي المعتاد؟', options: ['خمسة خطوط', 'خط واحد', 'ثلاثة خطوط', 'عشرة خطوط'], answer: 0 },
  'تطبيقات على المدرج الموسيقي': { question: 'أين نضع النغمات لقراءتها موسيقيًا؟', options: ['على الخطوط والفراغات', 'حول إطار الصفحة', 'داخل عنوان الدرس', 'على لوحة المفاتيح فقط'], answer: 0 },
  'نشيد (أرقامي)': { question: 'لنبدأ النشيد: أي ترتيب للأرقام تصاعدي؟', options: ['١، ٢، ٣، ٤', '٣، ١، ٤، ٢', '٤، ٣، ٢، ١', '٢، ٤، ١، ٣'], answer: 0 },
  'العلامة الإيقاعية الكروش (♫) والسكتة المقابلة لها': { question: 'أي رمز يعبّر عن الكروش؟', options: ['♫', '♩', '🎺', '📖'], answer: 0 },
  'إيقاع حركي (♩♫)': { question: 'كيف نؤدي نمطًا إيقاعيًا حركيًا؟', options: ['نصفّق ونتحرك وفق النبض', 'نتحرك بلا استماع', 'نغني جميعًا بسرعات مختلفة', 'نبقى بلا نبض'], answer: 0 },
  'نشيد (أسرتي)': { question: 'أيّ مشهد يناسب موضوع نشيد أسرتي؟', options: ['أسرة تتعاون معًا', 'إشارة مرور', 'ملعب فارغ', 'آلة موسيقية وحدها'], answer: 0 },
  'آلات الباند': { question: 'أيّ مجموعة تضم آلات موسيقية؟', options: ['طبول وصنوج وآلات نفخ', 'أقلام ودفاتر', 'أطباق وملاعق فقط', 'كرات وألعاب'], answer: 0 },
  'عزف مقطوعة موسيقية على آلات الباند': { question: 'ما أهم شيء عند عزف مقطوعة ضمن مجموعة؟', options: ['الاستماع والتزام الإيقاع', 'العزف بأعلى صوت دائمًا', 'تجاهل قائد المجموعة', 'تغيير الإيقاع باستمرار'], answer: 0 },
  'تدريبات صوتية بالتظليلات': { question: 'ماذا تعني التظليلات في الغناء؟', options: ['تغيير قوة الصوت تدريجيًا', 'تغيير كلمات الأغنية فقط', 'التوقف عن التنفس', 'تغيير لون الصفحة'], answer: 0 },
  'نشيد (عَلَم بلادي)': { question: 'أيّ لون يظهر في علم سلطنة عُمان؟', options: ['الأحمر والأبيض والأخضر', 'الأزرق والأصفر فقط', 'الأسود والبرتقالي فقط', 'البنفسجي والوردي فقط'], answer: 0 },
  'الشكل الإيقاعي (♫)': { question: 'أي رمز أمامك شكل إيقاعي؟', options: ['♫', '📐', '🍎', '🚲'], answer: 0 },
  'نشيد (سلامتي)': { question: 'أيّ تصرف يساعد على السلامة؟', options: ['الانتباه واتباع التعليمات', 'الجري في الطريق', 'دفع الآخرين', 'تجاهل التحذيرات'], answer: 0 },
  'آلة الأورج': { question: 'أي آلة يمكن أن تعزف نغمات بالضغط على المفاتيح؟', options: ['الأورج 🎹', 'كرة ⚽', 'كتاب 📘', 'مقص ✂️'], answer: 0 },
  'عزف مقطوعة موسيقية على آلة الأورج': { question: 'قبل عزف المقطوعة، ماذا نفعل؟', options: ['نتعرف إلى النغمات والإيقاع', 'نضغط كل المفاتيح معًا', 'نتجاهل اللحن', 'نسرع دون استماع'], answer: 0 },
  'اللعبة الشعبية (تراني بقطع السناسل)': { question: 'ما الذي نحتاجه لنجاح لعبة شعبية مع المجموعة؟', options: ['تعاون وتوقيت مشترك', 'العمل دون الاستماع', 'تغيير القواعد كل لحظة', 'عدم المشاركة'], answer: 0 },
  'الميزان الثلاثي': { question: 'كم نبضة أساسية نتوقع في الميزان الثلاثي؟', options: ['ثلاث نبضات', 'نبضة واحدة', 'خمس نبضات', 'لا توجد نبضات'], answer: 0 },
  'إيقاع حركي (♫)': { question: 'ما أفضل طريقة لتكرار الإيقاع بدقة؟', options: ['الاستماع ثم التصفيق بانتظام', 'التصفيق عشوائيًا', 'تجاهل النبض', 'التوقف بعد كل صوت'], answer: 0 },
  'نشيد (حرف الأجداد)': { question: 'أيّ موضوع يرتبط بعنوان «حرف الأجداد»؟', options: ['الحرف والمهن التراثية', 'الكواكب فقط', 'وسائل النقل الحديثة فقط', 'أشكال هندسية فقط'], answer: 0 },
  'أربيج سلم (دو الكبير)': { question: 'ما الذي نسمعه في أربيج دو الكبير؟', options: ['نغمات سلم دو الكبير بالتتابع', 'أصوات حيوانات فقط', 'إيقاع بلا نغمات', 'أصوات عشوائية'], answer: 0 },
  'قراءة إيقاعية وغناء صولفائي': { question: 'ما الذي يساعدنا على قراءة الإيقاع والغناء الصولفائي؟', options: ['متابعة الرموز والنبض والنغمات', 'تجاهل الرموز', 'الغناء دون استماع', 'البدء من أي مكان عشوائيًا'], answer: 0 },
}

function FlagIllustration({ country }: { country: 'oman' | 'japan' | 'france' }) {
  if (country === 'japan') return <svg viewBox="0 0 120 72" className="w-full max-w-[120px] mx-auto rounded-md border border-slate-200" role="img" aria-label="علم اليابان"><rect width="120" height="72" fill="white"/><circle cx="60" cy="36" r="18" fill="#bc002d"/></svg>
  if (country === 'france') return <svg viewBox="0 0 120 72" className="w-full max-w-[120px] mx-auto rounded-md border border-slate-200" role="img" aria-label="علم فرنسا"><rect width="40" height="72" fill="#0055a4"/><rect x="40" width="40" height="72" fill="white"/><rect x="80" width="40" height="72" fill="#ef4135"/></svg>
  return <svg viewBox="0 0 120 72" className="w-full max-w-[120px] mx-auto rounded-md border border-slate-200" role="img" aria-label="علم سلطنة عمان"><rect width="120" height="24" fill="#fff"/><rect y="24" width="120" height="24" fill="#d8232a"/><rect y="48" width="120" height="24" fill="#00843d"/><rect width="25" height="72" fill="#d8232a"/><path d="M8 19 L17 27 L10 35 L19 43 M19 19 L10 27 L17 35 L8 43" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
}

export default function PreLessonActivity({ lesson }: { lesson: Lesson }) {
  const [choice, setChoice] = useState<number | null>(null)
  const activity = warmups[lesson.title] ?? {
    question: `ما المعلومة التي تساعدك على فهم درس «${lesson.title}»؟`,
    options: ['ألاحظ عنوان الدرس وأستمع جيدًا', 'أتجاهل الأمثلة', 'أجيب دون قراءة', 'أتوقف عن المشاركة'],
    answer: 0,
  }
  const isNationalAnthem = lesson.title === 'النشيد الوطني'
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-sky-100 border-2 border-white p-5 md:p-7 shadow-chunky">
      <div className="flex items-center gap-3 mb-4"><span className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-300 text-3xl">💡</span><div><h2 className="text-2xl md:text-3xl font-extrabold">تهيّأ قبل أن تتعلّم</h2><p className="text-ink/65">نشاط قصير مرتبط بموضوع الدرس.</p></div></div>
      <p className="text-xl font-extrabold mb-4">{activity.question}</p>
      {isNationalAnthem ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['oman', 'japan', 'france'] as const).map((country, i) => <button key={country} onClick={() => setChoice(i)} className={`rounded-2xl border-2 p-4 font-bold transition ${choice === i ? (i === activity.answer ? 'border-emerald-500 bg-emerald-100' : 'border-rose-400 bg-rose-100') : 'border-white bg-white hover:bg-amber-50'}`}><FlagIllustration country={country}/><span className="block mt-3">{['سلطنة عُمان', 'اليابان', 'فرنسا'][i]}</span></button>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activity.options.map((option, i) => <button key={option} onClick={() => setChoice(i)} className={`rounded-2xl border-2 p-4 text-lg font-bold transition ${choice === i ? (i === activity.answer ? 'border-emerald-500 bg-emerald-100' : 'border-rose-400 bg-rose-100') : 'border-white bg-white hover:bg-amber-50'}`}>{option}</button>)}
        </div>
      )}
      {choice !== null && <p className="font-extrabold text-lg mt-4" aria-live="polite">{choice === activity.answer ? 'أحسنت! إجابة رائعة 🌟' : 'محاولة جميلة! جرّب اختيارًا آخر.'}</p>}
      {activity.clue && <p className="text-ink/65 mt-3">{activity.clue}</p>}
    </section>
  )
}
