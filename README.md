# Bandmark — full functionality (Reading & Listening)

Real accounts, a real database, and working auto-scored Reading & Listening tests.
Writing/Speaking AI grading, streaks, and leaderboards aren't built yet — this pass
covers the two auto-scorable skills end to end.

## Stack
Next.js 14 (App Router, TypeScript) + Tailwind + PostgreSQL/Prisma + NextAuth
(credentials + JWT sessions, no external OAuth needed to start).

## What actually works
- **Sign up / log in** — real accounts, hashed passwords (bcrypt), sessions via NextAuth.
- **Reading test** — 2 original passages, 10 questions (multiple choice, True/False/Not
  Given, sentence completion), timed, auto-scored on submit.
- **Listening test** — 2 sections, 10 questions. Audio is generated client-side with the
  browser's built-in text-to-speech (`SpeechSynthesisUtterance`) reading the transcript
  once — no audio files to host. Swap in real recordings later by adding an `audioUrl`
  field and an `<audio>` element; the transcript stays for accessibility either way.
- **Scoring** — server-side only (the client never receives `correctAnswer`). Raw score
  is converted to a band using the standard published /40 approximation tables, scaled
  to your question count. This is an estimate, not an official score — said as much on
  the results page.
- **Results page** — band score + full answer review (your answer vs. correct answer).

## Setup
```bash
npm install
cp .env.example .env
```
Then get a free Postgres database (Neon or Vercel Postgres both work — ~2 minutes),
paste the connection string into `DATABASE_URL` in `.env`, and generate a
`NEXTAUTH_SECRET` with `openssl rand -base64 32`.

```bash
npx prisma migrate dev --name init
npm run db:seed      # loads the sample Reading & Listening tests
npm run dev
```

Sign up at `/signup`, then go to `/practice/reading` or `/practice/listening` and hit
Start on a test.

## Deploying
Push to the connected GitHub repo — if it's already imported into Vercel, this
redeploys automatically. Add `DATABASE_URL` and `NEXTAUTH_SECRET` (and
`NEXTAUTH_URL` = your production URL) as Environment Variables in the Vercel
project settings first, then run migrate + seed once against that same
`DATABASE_URL` from your machine.

## Data model
`User → Attempt → Test → Section → Question → Answer`. See `prisma/schema.prisma`.
`Attempt` stores `rawScore`, `totalQuestions`, and `band` once submitted.

## Next pieces (not built yet)
- Writing: essay editor + an LLM call graded against the four IELTS Writing criteria.
- Speaking: audio recording/upload + transcription + the same LLM-grading pattern.
- Streaks, XP, and a leaderboard view over `Attempt` history.
- Swap Listening TTS for real recordings once you have licensed/original audio.
