# Atelier Vance

A cinematic concept portfolio for a fictional interior architect, **Aurelio Vance** (Milan / Copenhagen). Built with Next.js, TypeScript, Tailwind CSS and a deliberately tactile motion layer.

> **Fictional content:** every biography, qualification, project, award and client name is invented. All copy lives in `src/data/studio.ts` so it can be replaced in one place.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run lint
npm start
```

## Stack

- **Next.js App Router + TypeScript + Tailwind CSS v4**
- **Framer Motion** — masked type reveals, parallax, magnetic CTA, reveals and modal motion
- **Theatre.js** (`@theatre/core`) — a shipped keyframe state (`src/lib/theatre-state.json`) scrubs the architectural plan in the Process section
- **Curtains.js** — WebGL hover ripple / chromatic shift on the featured case study
- **Spline** (`@splinetool/react-spline`) — lazy-loaded interactive material study in the hero, with a designed fallback
- **Unlumen UI** (free shadcn registry components) — `CursorImageTrail` in the studio manifesto and `TiltCard` in the material library
- **Node.js route handler** — `POST /api/contact` validates the enquiry, applies a small in-memory rate limit and logs it to the server console

## Structure

```
src/
  app/
    api/contact/route.ts   Node enquiry endpoint
    globals.css            design system, loader, sections, responsive rules
    layout.tsx             fonts, metadata, viewport
    page.tsx               page composition
  components/
    preloader.tsx          drafting-table intro
    hero.tsx               editorial hero
    curtains-image.tsx     Curtains.js shader
    theatre-blueprint.tsx  Theatre.js scroll sequence
    ...
  data/studio.ts           all fictional content
  lib/theatre-state.json   Theatre.js keyframes
  types/curtainsjs.d.ts    minimal local declarations
public/images/             local editorial photography
```

## Notes

- The intro plays fully once per browser session and can be skipped.
- `prefers-reduced-motion` is respected by the loader, motion components, marquee and Theatre section.
- The contact form is a working demo: it validates and logs to the Node server, but no email provider is connected. To send real mail, connect a transactional email service in the route handler and move credentials into environment variables.
- Photography is sourced from Unsplash and stored locally for reproducible builds. The Spline scene is a public example scene; replace `SCENE` in `src/components/spline-object.tsx` with your own exported scene URL.
