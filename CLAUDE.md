# CLAUDE.md

Read `AGENTS.md` first — it contains the full project guide (stack, layout, conventions).

Quick essentials:

- **Project**: single-page premium site for ATCHAYAM Home Bakers (Kilinochchi). Dark espresso + gold.
- **Stack**: Next.js 16 App Router, TypeScript, Tailwind v4, Three.js (use `THREE.Timer`, not `Clock`), Framer Motion.
- **Content**: everything editable lives in `src/lib/data.ts`.
- **Sections**: all in `src/components/sections.tsx`.
- **Verify**: `npm run build` and `npm run lint` must pass.
- **Rules**: no oven/fantasy theme, no prices (WhatsApp ordering), desktop-only scroll transforms (mobile shake guard), respect reduced motion, no AI-attribution footers in commit messages, never push without being asked.