import { useState } from 'react'
import FlagColoring from './FlagColoring'
import type { Lesson } from '@/content/curriculum'

export default function PreLessonActivity({ lesson }: { lesson: Lesson }) {
  const [choice, setChoice] = useState<number | null>(null)
  const title = lesson.title
  const isNationalFlag = /النشيد الوطني|النشيد السلطاني/.test(title)
  const isNwar = /النوار/.test(title)
  const isPitch = /الحدة|الحِدّة|الغلظة|السرعة والبطء/.test(title)
  const isStaff = /المدرج الموسيقي|مفتاح صول/.test(title)
  const isKuroosh = /الكروش/.test(title)
  const isInstrument = /آلة الأورج|آلات الباند|آلات الباند|الأورج/.test(title)
  const isMeter = /الميزان الثلاثي/.test(title)
  const isArpeggio = /أربيج/.test(title)
  const isRhythm = /إيقاع|صولفائي/.test(title)
  const question = isNwar ? 'ماذا تلاحظ في خطوات العسكري المنتظمة؟'
    : isPitch ? 'كيف يمكن أن تختلف الأصوات عن بعضها؟'
    : isStaff ? 'أين نكتب النغمات الموسيقية؟'
    : isKuroosh ? 'أيّ رمز يمثّل علامة الكروش؟'
    : isInstrument ? 'أيّ صورة تمثل آلة موسيقية؟'
    : isMeter ? 'كم نبضة نتوقع في الميزان الثلاثي؟'
    : isArpeggio ? 'ما الذي نستكشفه عند عزف أربيج دو الكبير؟'
    : isRhythm ? 'ما الذي يساعدنا على المحافظة على الإيقاع؟'
    : /لعبة شعبية/.test(title) ? 'أيّ حركة تناسب لعبة شعبية جماعية؟'
    : /النشيد|نشيد/.test(title) ? 'ماذا نفعل عندما نؤدي النشيد أو النشيد المدرسي؟'
    : 'ما الذي تتوقع أن نتعلمه في هذا الدرس؟'
  const options = isNwar ? ['خطوات منتظمة ومتساوية', 'خطوات بلا ترتيب', 'العسكري لا يتحرك', 'خطوات متقطعة بلا نبض']
    : isPitch ? ['أصوات حادة وأصوات غليظة', 'كل الأصوات متطابقة', 'كل الأصوات صامتة', 'الأصوات لا تختلف أبدًا']
    : isStaff ? ['على المدرج الموسيقي', 'على ساعة الحائط', 'داخل كتاب القراءة', 'على لوحة الرسم']
    : isKuroosh ? ['♫', '♩', '🎹', '🎺']
    : isInstrument ? ['🎹', '🍎', '⚽', '📚']
    : isMeter ? ['ثلاث نبضات', 'نبضة واحدة فقط', 'سبع نبضات دائمًا', 'بلا نبضات']
    : isArpeggio ? ['نغمات سلم دو الكبير', 'ألوان العلم', 'أسماء الحيوانات', 'أشكال هندسية']
    : isRhythm ? ['نبضات منتظمة', 'أصوات عشوائية فقط', 'صمت دائم', 'ألوان متتابعة']
    : /لعبة شعبية/.test(title) ? ['حركات جماعية متناسقة', 'الجلوس دون حركة', 'القراءة الصامتة', 'الرسم فقط']
    : /النشيد|نشيد/.test(title) ? ['نقف باحترام وننصت', 'نرفع الصوت بالكلام الجانبي', 'نلعب أثناء النشيد', 'نتجاهل النشيد']
    : ['التعرف إلى موضوع الدرس', 'درس خارج الموسيقى', 'اللعب دون ملاحظة', 'لا شيء جديد']
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-sky-100 border-2 border-white p-5 md:p-7 shadow-chunky">
      <div className="flex items-center gap-3 mb-4"><span className="grid place-items-center w-14 h-14 rounded-2xl bg-amber-300 text-3xl">💡</span><div><h2 className="text-2xl md:text-3xl font-extrabold">تهيّأ قبل أن تتعلّم</h2><p className="text-ink/65">فكّر، لاحظ، ثم اختر إجابتك.</p></div></div>
      {isNationalFlag ? <div className="space-y-4"><p className="text-xl font-extrabold">أيّ الصور التالية تمثّل علم بلادك، سلطنة عُمان؟</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{['🇴🇲 علم سلطنة عُمان', '🇯🇵 علم اليابان', '🇫🇷 علم فرنسا'].map((label, i) => <button key={label} onClick={() => setChoice(i)} className={`rounded-2xl border-2 p-4 text-xl font-bold ${choice === i ? (i === 0 ? 'border-emerald-500 bg-emerald-100' : 'border-rose-400 bg-rose-100') : 'border-white bg-white hover:bg-amber-50'}`}><span className="block text-5xl mb-2">{label.split(' ')[0]}</span>{label.slice(label.indexOf(' ') + 1)}</button>)}</div>{choice !== null && <p className="font-extrabold text-lg" aria-live="polite">{choice === 0 ? 'أحسنت! هذا علم سلطنة عُمان 🇴🇲' : 'حاول مرة أخرى. ابحث عن علم سلطنة عُمان 🇴🇲'}</p>}<FlagColoring /></div> : <div className="space-y-4">{isNwar && <div className="rounded-2xl bg-white p-4 text-center"><div className="text-5xl mb-2">🕒　👮🏻‍♂️ 🚶🏻‍♂️ 🚶🏻‍♂️ 🚶🏻‍♂️</div><p className="text-ink/65">تخيّل أن العسكري يمشي بخطوة ثابتة مع دقّات الساعة.</p></div>}{isPitch && <div className="rounded-2xl bg-white p-4 text-center text-4xl">🐦 🔔　🎻 🥁</div>}<p className="text-xl font-extrabold">{question}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{options.map((option, i) => <button key={option} onClick={() => setChoice(i)} className={`rounded-2xl border-2 p-4 text-xl font-bold transition ${choice === i ? (i === 0 ? 'border-emerald-500 bg-emerald-100' : 'border-rose-400 bg-rose-100') : 'border-white bg-white hover:bg-amber-50'}`}>{option}</button>)}</div>{choice !== null && <p className="font-extrabold text-lg" aria-live="polite">{choice === 0 ? 'أحسنت! إجابة رائعة 🌟' : 'محاولة جميلة! جرّب اختيارًا آخر.'}</p>}</div>}
    </section>
  )
}
