"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import {
  brand,
  categories,
  galleryPhotos,
  ordering,
  signatures,
  story,
  visit,
  wa,
} from "@/lib/data";
import AtchayamCanvas from "./three/AtchayamCanvas";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── shared bits ── */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="gold-hairline h-px w-8" aria-hidden />
      {children}
      {center ? <span className="gold-hairline h-px w-8" aria-hidden /> : null}
    </p>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/atchayam-logo.png"
      alt="ATCHAYAM Home Bakers logo"
      width={417}
      height={384}
      className={`rounded-md bg-white object-contain ${className ?? "h-9 w-auto"}`}
      priority
    />
  );
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className ?? "h-4 w-4"}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.16L2 22l4.96-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.94.95.96-2.87-.2-.3a8.2 8.2 0 1 1 6.66 3.55Zm4.5-6.14c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.77.95-.14.17-.28.19-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.04 0 1.2.87 2.36 1 2.52.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.4.51.58.19 1.11.16 1.53.1.47-.07 1.45-.6 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function GoldButton({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-gold-soft via-gold to-gold-deep px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.18em] text-espresso shadow-[0_10px_35px_-12px_rgba(201,162,94,0.65)] transition-all duration-300 hover:shadow-[0_16px_45px_-10px_rgba(201,162,94,0.8)] hover:brightness-110 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/20 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ivory/90 transition-all duration-300 hover:border-gold/60 hover:text-gold"
    >
      {children}
    </a>
  );
}

/* ── 1 · Nav ── */
const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Our Bakes", href: "#bakes" },
  { label: "Order", href: "#order" },
  { label: "Visit Us", href: "#visit" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-ivory/[0.07] bg-espresso md:bg-espresso/85 md:backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark className="h-10 w-auto rounded-lg" />
          <span className="leading-none">
            <span className="font-display block text-[15px] font-semibold tracking-[0.28em] text-ivory">
              ATCHAYAM
            </span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.4em] text-gold">
              Home Bakers · அட்சயம்
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-sand transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={wa.link()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-espresso"
          >
            <WaIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-ivory/15 md:hidden"
        >
          <span className={`h-px w-4 bg-ivory transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-ivory transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-ivory/[0.07] bg-espresso/95 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.24em] text-ivory/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href={wa.link()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft via-gold to-gold-deep px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-espresso"
            >
              <WaIcon /> Order on WhatsApp
            </a>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}

/* ── hero backdrop — the seven bakes, full-screen, slowly turning ── */

function HeroBackdrop({
  slide,
  rm,
  px,
  py,
}: {
  slide: number;
  rm: boolean | null;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const photos = galleryPhotos.slice(0, 7);
  return (
    <motion.div aria-hidden className="absolute inset-0" style={{ x: px, y: py }}>
      {photos.map((p, i) => (
        <motion.div
          key={p.src}
          className="absolute inset-0"
          animate={{ opacity: i === slide ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={rm ? undefined : { scale: [1.06, 1.15, 1.06] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={p.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── 2 · Hero — the brand, alone over a quiet field of gold dust ── */
export function HeroSection() {
  const rm = useReducedMotion();

  /* scroll-linked hero motion only on desktop — on touch devices it
     fights momentum scrolling and makes the page visibly shake */
  const [heroMotion, setHeroMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setHeroMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* as the visitor scrolls away, the words drift up and fade out */
  const secRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 0.9], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1, 0]);

  /* the seven bakes as a full-screen slideshow — one fades into the next */
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (rm) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % galleryPhotos.length), 6000);
    return () => clearInterval(id);
  }, [rm]);

  /* scroll parallax on the background (desktop only) */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.02]);

  /* mouse parallax — the scene drifts gently against the cursor */
  const parX = useMotionValue(0);
  const parY = useMotionValue(0);
  const photoX = useSpring(parX, { stiffness: 55, damping: 20 });
  const photoY = useSpring(parY, { stiffness: 55, damping: 20 });
  const bgParX = useTransform(photoX, (v) => v * 10);
  const bgParY = useTransform(photoY, (v) => v * 8);
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    if (rm) return;
    const r = e.currentTarget.getBoundingClientRect();
    parX.set((e.clientX - r.left) / r.width - 0.5);
    parY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    parX.set(0);
    parY.set(0);
  };

  return (
    <section
      ref={secRef}
      id="top"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* 1 · the seven bakes as a full-screen slideshow */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={rm || !heroMotion ? undefined : { y: bgY, scale: bgScale }}
      >
        <HeroBackdrop slide={slide} rm={rm} px={bgParX} py={bgParY} />
      </motion.div>
      {/* 2 · dark washes keep the words readable; the edges melt into the page */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,16,12,0.78) 0%, rgba(18,16,12,0.22) 30%, rgba(18,16,12,0.34) 55%, rgba(18,16,12,0.82) 84%, #12100c 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 46%, rgba(18,16,12,0.25) 0%, rgba(18,16,12,0) 60%)",
        }}
      />
      {/* 3 · living gold dust over the scene */}
      <AtchayamCanvas />

      <motion.div
        style={rm || !heroMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-28 sm:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-gold sm:text-[11px]"
        >
          {brand.name} {brand.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease: EASE }}
          className="font-display mt-4 text-center text-5xl font-medium leading-[1.04] tracking-tight text-ivory drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-7xl"
        >
          Our bakes,
          <br />
          <span className="text-gold-gradient italic">our story.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48, duration: 0.9 }}
          className="mt-4 max-w-md text-center text-sm leading-relaxed text-sand drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] sm:text-[15px]"
        >
          Fresh bread, buns, cakes and sweets, baked daily in the spirit of{" "}
          <span className="font-tamil text-ivory/90">அட்சயம்</span> — abundance
          you can taste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.8, ease: EASE }}
          className="mt-7 flex flex-col items-center gap-4 sm:flex-row"
        >
          <GoldButton href={wa.link()} external>
            <WaIcon /> Order on WhatsApp
          </GoldButton>
          <GhostButton href="#bakes">Explore the bakes ↓</GhostButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 1 }}
          className="mt-9 flex flex-col items-center gap-2"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-sand/80">
            Fresh daily · 7 AM – 9:30 PM · Kilinochchi
          </p>
          <motion.span
            animate={rm ? undefined : { y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            className="text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path d="M12 4v16m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── 3 · Our Story ── */
export function StorySection() {
  return (
    <section id="story" className="vignette relative scroll-mt-20 overflow-hidden px-6 py-28 md:py-40">
      <p
        aria-hidden
        className="font-tamil pointer-events-none absolute -right-6 top-16 select-none text-[34vw] leading-none text-ivory/[0.025] lg:text-[300px]"
      >
        அட்சயம்
      </p>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
              A home bakery in the spirit of{" "}
              <span className="font-tamil text-gold-gradient normal-case tracking-normal">
                {story.tamilWord}
              </span>
            </h2>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-sand sm:text-base">
              {story.founder}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <div className="glass-panel h-full rounded-2xl p-8 sm:p-10">
              <p className="font-tamil text-3xl text-gold">{story.tamilWord}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-ivory/85">
                {story.tamilMeaning}
              </p>
              <div className="gold-hairline mt-8 h-px w-full opacity-60" />
              <p className="font-display mt-8 text-2xl italic leading-snug text-ivory sm:text-[28px]">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {story.pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-ivory/[0.08] bg-coal/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-4xl italic text-gold/80">{p.k}</p>
                  <span className="h-px w-10 bg-ivory/10 transition-colors group-hover:bg-gold/50" />
                </div>
                <h3 className="font-display mt-5 text-xl font-medium text-ivory">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Our Bakes ── */
function OrderRow({ item }: { item: string }) {
  return (
    <a
      href={wa.link(wa.orderMsg(item))}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
    >
      Order
      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
    </a>
  );
}

function SignatureCard({
  s,
  i,
}: {
  s: (typeof signatures)[number];
  i: number;
}) {
  const link = wa.link(wa.orderMsg(s.name));
  return (
    <Reveal delay={(i % 3) * 0.1} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/[0.08] bg-coal/60 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(201,162,94,0.35)]">
        {s.src ? (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={s.src}
              alt={s.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coal/90 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-espresso/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
              {s.tag}
            </span>
          </div>
        ) : (
          <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-b from-cocoa to-coal p-6">
            <div className="gold-hairline absolute inset-x-6 top-0 h-px opacity-40" />
            <p
              aria-hidden
              className="font-display absolute -right-3 -top-6 select-none text-[110px] italic leading-none text-ivory/[0.045]"
            >
              {s.name.charAt(0)}
            </p>
            <span className="rounded-full border border-gold/40 bg-espresso/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-gold">
              {s.tag}
            </span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[22px] font-medium leading-snug text-ivory">
            {s.name}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-sand">{s.note}</p>
          <div className="mt-5 flex items-center justify-between border-t border-ivory/[0.07] pt-4">
            <span className="text-[10px] uppercase tracking-[0.28em] text-sand/60">
              Made to order
            </span>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
            >
              <WaIcon className="h-3.5 w-3.5" />
              Order
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function BakesSection() {
  return (
    <section id="bakes" className="relative scroll-mt-20 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>Our Bakes</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] tracking-tight text-ivory sm:text-6xl">
            Signature bakes,
            <br />
            <span className="text-gold-gradient italic">loved daily.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-sand sm:text-base">
            The treats our counter is known for. Message us what you&rsquo;d
            like — every item is baked fresh, and prices are shared on WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatures.map((s, i) => (
            <SignatureCard key={s.id} s={s} i={i} />
          ))}
          <Reveal delay={0.15} className="h-full">
            <a
              href="#order"
              className="group flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-dashed border-gold/30 bg-gradient-to-b from-cocoa/70 to-coal p-7 transition-all duration-500 hover:border-gold/60 hover:shadow-[0_30px_60px_-30px_rgba(201,162,94,0.35)]"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Something special?
                </p>
                <p className="font-display mt-4 text-2xl font-medium leading-snug text-ivory">
                  Custom celebration cakes, brownie boxes &amp; event trays —
                  made to order.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                See how to order
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 5 · The full counter (menu lists) ── */
export function CounterSection() {
  return (
    <section className="relative px-6 pb-28 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>The Counter</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] tracking-tight text-ivory sm:text-5xl">
            Everything we bake,
            <br />
            <span className="text-gold-gradient italic">all day long.</span>
          </h2>
        </Reveal>

        {categories.map((cat, ci) => (
          <Reveal key={cat.id} delay={ci * 0.05}>
            <div className="mt-16 grid gap-x-14 lg:grid-cols-[minmax(0,280px)_1fr]">
              <div className="mb-6 lg:mb-0">
                <p className="font-display text-3xl font-medium text-ivory">
                  <span className="mr-3 text-gold/70">{ci + 1}.</span>
                  {cat.title}
                </p>
                <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-sand">
                  {cat.blurb}
                </p>
              </div>
              <ul>
                {cat.items.map((item) => (
                  <li
                    key={item.id}
                    className="group flex items-center gap-6 border-b border-ivory/[0.07] py-4 transition-colors hover:border-gold/25"
                  >
                    <span className="font-display flex-1 text-lg font-medium text-ivory/90 transition-colors group-hover:text-ivory sm:text-xl">
                      {item.name}
                    </span>
                    <span className="hidden max-w-md flex-1 text-[13px] leading-relaxed text-sand/80 sm:block">
                      {item.note}
                    </span>
                    <OrderRow item={item.name} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-sand/70">
            All items are baked fresh on the day. For allergens, dietary needs
            or custom quantities —{" "}
            <a
              href={wa.link("Hello Atchayam Home Bakers! I have a question about allergens and ingredients.")}
              target="_blank"
              rel="noreferrer"
              className="text-gold underline-offset-4 hover:underline"
            >
              just ask us
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 6 · How to order ── */
export function OrderSection() {
  return (
    <section id="order" className="relative scroll-mt-20 px-6 py-28 md:py-36">
      <div className="gold-hairline absolute inset-x-0 top-0 h-px opacity-30" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{ordering.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
              Fresh to you,{" "}
              <span className="text-gold-gradient italic">
                {ordering.headingItalic}
              </span>
            </h2>

            <ol className="mt-12 space-y-9">
              {ordering.steps.map((s, i) => (
                <motion.li
                  key={s.k}
                  initial={{ opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="relative pl-16"
                >
                  <span className="font-display absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-lg italic text-gold">
                    {s.k}
                  </span>
                  {i < ordering.steps.length - 1 ? (
                    <span className="absolute left-[22px] top-12 h-[calc(100%-_1.5rem)] w-px bg-gradient-to-b from-gold/30 to-transparent" />
                  ) : null}
                  <h3 className="font-display text-xl font-medium text-ivory">{s.t}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-sand">{s.d}</p>
                </motion.li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="glass-panel sticky top-28 flex h-fit flex-col rounded-2xl p-8 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold">
                Start your order
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-sand">
                Send us a message and we&rsquo;ll confirm availability, timing
                and payment for your order.
              </p>
              <div className="mt-7 flex flex-col gap-3.5">
                <GoldButton href={wa.link()} external className="w-full">
                  <WaIcon /> Message on WhatsApp
                </GoldButton>
                <a
                  href={`tel:${visit.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-ivory/15 px-6 py-3.5 text-[13px] font-semibold tracking-[0.14em] text-ivory/90 transition-colors hover:border-gold/50 hover:text-gold"
                >
                  or call {visit.phone}
                </a>
              </div>
              <p className="mt-6 border-t border-ivory/[0.08] pt-5 text-xs leading-relaxed text-sand/75">
                Custom cakes &amp; larger orders — please book in advance so
                we have time to bake and decorate. Payment arrangements are
                confirmed when you place the order.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-20">
          <div className="rounded-2xl border border-ivory/[0.08] bg-coal/50 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-md">
                <p className="font-display text-2xl font-medium text-ivory">
                  {ordering.customTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sand">
                  {ordering.customIntro}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {ordering.customTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gold/25 bg-espresso/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-ivory/[0.07] pt-6">
              <p className="text-[12px] leading-relaxed text-sand/75">
                <span className="font-bold uppercase tracking-[0.18em] text-gold/90">
                  Allergies —
                </span>{" "}
                {ordering.allergenNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 7 · Visit us ── */
export function VisitSection() {
  return (
    <section id="visit" className="vignette relative scroll-mt-20 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{visit.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] tracking-tight text-ivory sm:text-6xl">
              Find the bakery
              <br />
              <span className="text-gold-gradient italic">in the neighbourhood.</span>
            </h2>

            <div className="mt-10 flex items-start gap-5 rounded-2xl border border-ivory/[0.08] bg-coal/60 p-7">
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden>
                <path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Address
                </p>
                <p className="font-display mt-2 whitespace-pre-line text-xl font-medium leading-snug text-ivory">
                  {visit.address}
                </p>
                <p className="mt-2 text-sm text-sand">Kilinochchi, Sri Lanka</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-ivory/[0.08] bg-coal/60 p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  {visit.hoursLine}
                </p>
                <p className="font-display mt-2 text-3xl font-medium text-ivory">
                  {visit.hours}
                </p>
                <p className="mt-2 text-sm text-sand">Seven days a week</p>
              </div>
              <div className="rounded-2xl border border-ivory/[0.08] bg-coal/60 p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Pickup &amp; delivery
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sand">
                  Collect from the bakery, or arrange delivery — depending on
                  the order and where you are.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="glass-panel h-fit rounded-2xl p-8 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold">
                Say hello
              </p>
              <ul className="mt-6 space-y-1">
                {[
                  {
                    label: "Phone / WhatsApp",
                    value: visit.phone,
                    href: wa.link(),
                    external: true,
                  },
                  {
                    label: "Email",
                    value: visit.email,
                    href: `mailto:${visit.email}`,
                    external: false,
                  },
                  {
                    label: "Instagram",
                    value: visit.instagram,
                    href: visit.instagramUrl,
                    external: true,
                  },
                ].map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center justify-between gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-ivory/[0.04]"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">
                        {row.label}
                      </span>
                      <span className="text-right text-sm font-semibold text-ivory transition-colors group-hover:text-gold">
                        {row.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-ivory/[0.08] pt-6">
                <p className="text-[11px] leading-relaxed text-sand/75">
                  Daily 7:00 AM – 9:30 PM · freshly baked throughout the day.
                  Follow us on Instagram for the day&rsquo;s bakes.
                </p>
                <a
                  href={wa.link()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
                >
                  <WaIcon className="h-4 w-4" /> WhatsApp us now →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 8 · Footer ── */
export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/[0.07] bg-[#0d0b08]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark className="h-12 w-auto rounded-lg" />
              <div className="leading-none">
                <p className="font-display text-base font-semibold tracking-[0.26em] text-ivory">
                  ATCHAYAM
                </p>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.4em] text-gold">
                  Home Bakers
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-sand">
              A home bakery in the spirit of{" "}
              <span className="font-tamil text-ivory/85">அட்சயம்</span> —
              abundance. Freshly baked daily in Ambalkulam, Kilinochchi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-sand transition-colors hover:text-gold">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Visit</p>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-sand">
                {visit.address}
              </p>
              <p className="mt-2 text-sm text-sand">Open daily · {visit.hours}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Order</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={wa.link()} target="_blank" rel="noreferrer" className="text-sand transition-colors hover:text-gold">
                    {visit.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${visit.email}`} className="break-all text-sand transition-colors hover:text-gold">
                    {visit.email}
                  </a>
                </li>
                <li>
                  <a href={visit.instagramUrl} target="_blank" rel="noreferrer" className="text-sand transition-colors hover:text-gold">
                    {visit.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/[0.06] pt-8 sm:flex-row">
          <p className="text-[11px] text-sand/60">
            © {new Date().getFullYear()} {brand.full}. All rights reserved.
          </p>
          <p className="font-tamil text-[11px] text-gold/70">
            தரமும் சுவையும் எங்கள் அடையாளம்
          </p>
          <p className="text-[11px] text-sand/60">Baked with care · Kilinochchi, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
