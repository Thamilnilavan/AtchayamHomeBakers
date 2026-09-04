# ATCHAYAM Home Bakers

A premium, single-page marketing website for **ATCHAYAM Home Bakers** — a home bakery at 153/1, Ambalkulam, Kilinochchi, Sri Lanka, founded by Aathiththiya in February 2026.

The site opens on a **full-screen hero that cycles through the seven real bake photos** — slow crossfades, cinematic zoom, mouse + scroll parallax and drifting 3D gold dust — with the brand headline overlaid. Below it, editorial sections tell the story of அட்சயம் ("abundance"), present the signature bakes and the full menu, and route every order straight to WhatsApp. No prices anywhere: each product opens a pre-filled WhatsApp message to the bakery's chat.

## Tech stack

- **Next.js (App Router) + TypeScript** — static export (`output: "export"` → `out/`)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css` (`@theme`)
- **Three.js** — the WebGL gold-dust field behind the hero
- **Framer Motion** — hero slideshow, parallax, and staggered scroll reveals

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # typecheck + production build (static export → out/)
npm run lint
```

## Page structure

One scrolling page:

1. **Nav** — logo chip, anchor links (Our Story / Our Bakes / Order / Visit Us), WhatsApp pill
2. **Hero** — full-screen slideshow of the seven bake photos with gold dust, headline, WhatsApp + Explore CTAs
3. **Our Story** — founder Aathiththiya, the meaning of அட்சயம், three pillars, brand quote
4. **Signature Bakes** — the five bestsellers as photo/wordmark cards + custom-orders tile
5. **The Counter** — the full menu (18 items in three categories), each row opening WhatsApp
6. **How to Order** — 3-step timeline, sticky WhatsApp/call card, made-to-order tags, allergen note
7. **Visit Us / Footer** — address, hours, phone, email, Instagram, Tamil sign-off

## Where content lives

All text and business details live in **`src/lib/data.ts`** — edit one file to change the site:

| Content | Export |
|---|---|
| Menu, bestseller cards, tasting notes | `signatures`, `categories` |
| Story, அட்சயம் meaning, pillars, quote | `story` |
| Ordering steps, custom tags, allergen note | `ordering` |
| Address, hours, phone, email, Instagram | `visit` |
| Brand name, Tamil wordmark | `brand` |
| WhatsApp number & pre-filled messages | `wa` |
| Hero slideshow photos (7) | `galleryPhotos` |

### Customising

- **Photos** — put files in `public/desserts/` and update `galleryPhotos` (and `signatures[].src`) in `src/lib/data.ts`. The current JPGs are placeholders until the client supplies real product photography.
- **WhatsApp number** — change `wa.number` (international format, no `+`) and `wa.display`.
- **Colours & fonts** — theme tokens in `src/app/globals.css`; font imports in `src/app/layout.tsx`.
- **Hero slideshow** — timing, crossfade speed and Ken Burns zoom live in `HeroSection` / `HeroBackdrop` in `src/components/sections.tsx`.
- **3D gold dust** — `src/components/three/AtchayamCanvas.tsx` (renderer, camera, dust drift, pause-when-off-screen) and `world.ts` (particle field).
- **Sections** — all page components live in `src/components/sections.tsx`.

## Deploying

The build produces a fully static site in `out/` (see `next.config.ts`), which can be hosted on GitHub Pages, Netlify, Vercel, or any static host:

```bash
npm run build
# then point your host at ./out
```

## Pre-launch checklist (client content)

1. **Product photos** — replace the placeholder JPGs in `public/desserts/` with the client's real photography (roughly 1400 px wide, JPEG). The hero slideshow and the bakes cards pick them up automatically.
2. **Logo** — `public/atchayam-logo.png` was cropped from the client's A4 PDF and sits in a white chip because it was designed for a light background. A transparent PNG/SVG would let it sit directly on the dark theme.
3. **Prices** — deliberately absent; add them per item once the client decides on pricing.
4. **Order details** — confirm the WhatsApp number (currently `074 384 2935`) and the delivery/pickup policy copy before launch.