# AI PM Daily

A personal, installable (PWA) daily-learning app to master **AI Product Management**
through bite-sized lessons, simple concept diagrams, real-world fintech use cases, and
hands-on practice challenges — with XP, levels, and streaks to keep the habit going.

Fully static and offline: no backend, no API keys, no accounts. Progress is stored in
your browser's `localStorage`.

## The daily loop

**Home** (today's mission) → **Learn** (concept diagram + use case + why it matters) →
**Practice** (arrange-the-steps challenge) → **Progress** (XP, streak, skills).

## Run it

```bash
cd ai-pm-daily
npm install
npm run dev        # open the printed localhost URL
```

Production build / PWA check:

```bash
npm run build
npm run preview
```

On your phone, open the served URL and use **Add to Home Screen** to install it.

## Add a lesson

Append a `Concept` object to `src/content/concepts.ts`. Each concept carries its own
diagram, use case, "why it matters", and one ordering challenge — no code changes needed
elsewhere. Skill areas live in `src/content/skills.ts`.

## Tech

Vite · React · TypeScript · Tailwind CSS · React Router · Zustand (persisted) ·
vite-plugin-pwa · lucide-react.
