# نغماتي — منصة المهارات الموسيقية 🎵

An interactive, child-friendly learning platform for the **Music Skills** subject (المهارات الموسيقية) following the Sultanate of Oman curriculum for **Grade 1** and **Grade 4**. No sign-up or login is needed for students or parents — progress stars are kept on the device itself.

## What's inside

- **Home** — a welcome with an Omani mascot teacher and grade selection (Grade 1 / Grade 4).
- **Grade pages** — units and lessons, colour-coded, with a progress bar and stars per lesson.
- **Lesson pages**, each with three steps:
  1. **Watch & learn** — a virtual-teacher area that embeds a YouTube / Genially / AI-teacher video via iFrame. With no video set, the mascot explains the lesson in speech bubbles and can read it aloud (browser Arabic text-to-speech).
  2. **Interactive questions** — multiple-choice option cards with instant feedback ("إجابة صحيحة!" / "حاول مرة أخرى"), sounds, hints, and a 1–3 star result.
  3. **Practice & activities** — embedded Chrome Music Lab experiments, Wordwall games, Genially, or tools from the built-in lab.
- **Music Lab** (`/lab`) — a two-octave piano with Arabic note names (دو ري مي…) and a follow-the-light melody mode, a rainbow xylophone, an Omani percussion pad (الرحماني، الكاسر، الطار، المسندو…) with a loud/soft control, and an 8-step rhythm maker with tempo control. All sounds are synthesised with the Web Audio API — no audio files.
- **Teacher guide** (`/teacher`) — how to add content, a link checker/previewer for YouTube/Genially/Wordwall, a lesson template, and a content-status table showing which lessons still need a video or game link.

## Adding or updating content

Everything lives in one file: **`src/content/curriculum.ts`**.

- Paste a normal YouTube, Genially or Wordwall link — it is converted to an embed URL automatically.
- External activities with an empty `url` are hidden from students until a link is added.
- Lesson titles follow the structure of the Omani Music Skills books; adjust names and order to match the edition used at your school.

## Tech

TanStack Start (React 19, file-based routing), Tailwind CSS 4, Web Audio API, Netlify Image CDN for optimised illustrations, deployed on GitHub Pages.

## GitHub Pages

The project is configured for the repository name `naghmati-music-skills`. After pushing to GitHub, enable **Settings → Pages → GitHub Actions**. The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `dist/client`.

The curriculum structure is taken from the uploaded Oman teacher guides. Interactive media fields are intentionally left blank where a verified lesson-specific URL has not been supplied yet; this avoids inventing external content.

## Run locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```
