<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ATCHAYAM Home Bakers — project guide for agents

## What this is

A single-page marketing site for a Sri Lankan home bakery (Ambalkulam, Kilinochchi). Dark espresso + warm gold premium look. There is **no oven/door/fantasy theme** and **no low-poly 3D models** — those were removed. The hero is a **full-screen slideshow of the seven real dessert photos** with gold dust.

## Stack

- Next.js 16 (App Router) + TypeScript, **static export** (`output: "export"` → `out/`)
- Tailwind CSS v4 (design tokens in `src/app/globals.css` `@theme`)
- Three.js (r18x — **use `THREE.Timer`, not the deprecated `THREE.Clock`**) for the gold-dust canvas
- Framer Motion for hero slideshow, parallax, scroll reveals

## Layout

- All page sections live in `src/components/sections.tsx` (`SiteNav`, `HeroSection`, `MarqueeRibbon`, `StorySection`, `BakesSection`, `CounterSection`, `OrderSection`, `TestimonialsSection`, `GalleryStrip`, `VisitSection`, `SiteFooter`, `MobileOrderBar`)
- 3D: `src/components/three/AtchayamCanvas.tsx` + `world.ts`
- All site copy/data: `src/lib/data.ts` (single source of truth — menu, story, WhatsApp, hours, contact)

## Conventions & guardrails

- `npm run build` (typecheck + static export) and `npm run lint` must stay green after any change.
- **No prices anywhere** — products link to pre-filled WhatsApp messages (`wa.link()` in `src/lib/data.ts`).
- Ordering happens via WhatsApp (`wa.me/94743842935`); never introduce a payment gateway unless asked.
- `public/desserts/*.jpg` are **placeholder photos** — paths are wired through `src/lib/data.ts` (`galleryPhotos`, `signatures[].src`).
- Mobile behaviour matters: scroll-linked transforms are desktop-only (`heroMotion` matchMedia gate) to avoid scroll jitter on touch devices. Preserve that pattern for any new hero motion.
- `prefers-reduced-motion` must be respected (framer's `useReducedMotion` / CSS).
- Tamil (அட்சயம்) is used tastefully as a brand accent — keep it subtle, never a heavy traditional theme.
- Commit messages: clean and descriptive, **no AI-attribution footers** (e.g. no "Generated with Codebuff"). The owner pushes manually; do not push without being asked.