# Bandmark — website (no backend)

A static, multi-page marketing site. No database, no auth, no API routes — every
page is content-only. Swap this for the full app scaffold later if you want the
actual test-taking product; this is just the front door.

## Stack
Next.js 14 (App Router, TypeScript) + Tailwind CSS + lucide-react icons.

## Pages
| Route | Content |
|---|---|
| `/` | Homepage |
| `/practice` | Overview linking to all four skills |
| `/practice/reading` | Reading format, sample question, tips |
| `/practice/listening` | Listening format, sample question, tips |
| `/practice/writing` | Writing format, sample prompt, tips |
| `/practice/speaking` | Speaking format, sample cue card, tips |
| `/pricing` | Free vs Premium comparison + FAQ |
| `/about` | Positioning / mission |
| `/contact` | Contact form (client-side only — see note below) |

## Structure
- `components/Nav.tsx`, `components/Footer.tsx` — shared chrome, rendered once in `app/layout.tsx`
- `components/SkillPage.tsx` — one template reused by all four `/practice/[skill]` pages,
  each passing its own data object (stats, question types, sample, tips)
- `tailwind.config.ts` — design tokens: colors (`navy`, `paper`, `amber`, `amberdeep`,
  `green`, `slate`) and fonts (`display` = Space Grotesk, `body` = Inter, `mono` = IBM Plex Mono)

## Setup
```bash
npm install
npm run dev
```

## Notes
- The contact form only updates local state on submit (`app/contact/page.tsx`) — it
  doesn't send anything yet. Wire it to an email service (Resend, Formspree) or your
  own API route when you're ready.
- The "Start free" / "Log in" buttons currently route to `/pricing` and `/contact` —
  point them at real auth once you build it.
- To add real tests, scoring, and accounts later, the earlier `bandmark-app` scaffold
  (Prisma schema + Next.js API routes) is the natural next step — this site's pages
  can move into that project largely as-is.
