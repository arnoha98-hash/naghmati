# AGENTS.md

## Project

"نغماتي" — an Arabic (RTL), kid-focused music-skills learning site for the Omani curriculum, Grades 1 and 4. Fully static content; **no accounts, no database by design** (the user explicitly required no login). Per-lesson stars are stored in `localStorage` only (`src/lib/progress.ts`).

## Stack

TanStack Start + React 19 + TanStack Router (file routes), Tailwind CSS 4 (theme tokens in `src/styles.css`), lucide-react icons, Netlify.

## Layout

```
src/content/curriculum.ts   # SINGLE source of all grades/units/lessons/questions/activities + getGrade/getLesson helpers
src/routes/
  __root.tsx                # <html lang="ar" dir="rtl">, font (Baloo Bhaijaan 2), header/footer, 404
  index.tsx                 # welcome + grade picker + lab teaser
  grade.$gradeId.tsx        # units + lesson cards (/grade/grade-1, /grade/grade-4)
  lesson.$gradeId.$lessonId.tsx  # 3 steps: TeacherPanel → Quiz → ActivityCard list
  lab.tsx                   # ?tool=piano|xylophone|drums|rhythm
  teacher.tsx               # teacher guide, link checker, content status table
src/components/             # TeacherPanel, Quiz, ActivityCard (+ labToolMeta), StarRow, header/footer
src/components/lab/         # Piano, Xylophone, DrumPad, RhythmMaker
src/lib/audio.ts            # Web Audio synth (piano, mallet, Omani drums, feedback sounds)
src/lib/embed.ts            # toEmbedUrl(): YouTube/Genially/Wordwall link → iframe URL
src/lib/speech.ts           # Arabic speechSynthesis helpers
src/lib/images.ts           # img(path, w) → Netlify Image CDN URL
src/lib/theme.ts            # per-grade / per-unit Tailwind class maps (full class names so Tailwind picks them up)
public/img/                 # AI-generated illustrations (mascot, lab, grade1, grade4) — white backgrounds, rendered with .blend-img (multiply)
```

## Conventions

- All UI copy is Arabic; keep `dir="ltr"` on instruments (piano/xylophone/rhythm grid) so low notes stay on the left.
- Content edits go in `curriculum.ts` only; components must stay data-driven. `answer` is a 0-based index.
- Activities: `lab` (internal tool) or `musiclab | wordwall | genially | embed` with a `url`. Empty external URLs are hidden (`isActivityReady`).
- Always reference images through `img()` (Netlify Image CDN), never the raw PNG.
- Playful style: rounded-3xl cards, `.shadow-chunky`, emoji icons, `animate-pop/wiggle/bounce-in`.

## Possible next steps

Real teacher video / Wordwall links per lesson; a content-editing UI for teachers (would need Netlify Identity + Netlify Database); more grades.
