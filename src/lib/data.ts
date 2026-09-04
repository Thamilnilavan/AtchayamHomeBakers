/* ─────────────────────────────────────────────────────────────
   ATCHAYAM HOME BAKERS — content
   Photos in public/desserts are placeholders until the client
   supplies real product photography.
───────────────────────────────────────────────────────────── */

export type Bake = {
  id: string;
  name: string;
  note: string;
  src?: string;
};

export type Category = {
  id: string;
  title: string;
  blurb: string;
  items: Bake[];
};

/* ── WhatsApp ── */
export const wa = {
  number: "94743842935", // 074 384 2935 → international
  display: "074 384 2935",
  defaultMsg: "Hello Atchayam Home Bakers! I'd like to place an order.",
  orderMsg: (item: string) =>
    `Hello Atchayam Home Bakers! I'd like to order: ${item}. Could you let me know availability?`,
  link: (msg?: string) =>
    `https://wa.me/${wa.number}?text=${encodeURIComponent(msg ?? wa.defaultMsg)}`,
} as const;

/* ── Hero photos (7 placeholders → the client's real shots later) ── */
const D = "/desserts";

export const galleryPhotos = [
  { src: `${D}/indulgent-homemade-chocolate-brownie-fresh-sweet-generated-by-ai.jpg`, label: "Chocolate fudge brownies" },
  { src: `${D}/assortment-chocolate-cupcakes-with-copy-space.jpg`, label: "Chocolate cupcakes" },
  { src: `${D}/ai-generated-cake-picture.jpg`, label: "Celebration cakes" },
  { src: `${D}/chocolate-brownie-portion-isolated-white-background.jpg`, label: "Fresh brownies" },
  { src: `${D}/muffins-with-cocoa-cream-wooden-board.jpg`, label: "Muffin cakes" },
  { src: `${D}/delicious-pain-aux-raisin-with-sugar.jpg`, label: "Buttery pastries" },
  { src: `${D}/decadent-chocolate-brownie-with-sauce-splash-dark-background.jpg`, label: "Molten brownies" },
] as const;

/* ── Signature bakes (bestsellers) ── */
export const signatures: (Bake & { tag: string; kind: "photo" | "wordmark" })[] = [
  {
    id: "chocolate-fudge-brownies",
    name: "Chocolate Fudge Brownies",
    note: "Dense, fudgy and deeply chocolate — the bake that started it all, and still our most loved.",
    src: galleryPhotos[0].src,
    tag: "Signature",
    kind: "photo",
  },
  {
    id: "celebration-cakes",
    name: "Custom Celebration Cakes",
    note: "Birthdays, anniversaries, any reason at all — designed with you and baked to order.",
    src: galleryPhotos[2].src,
    tag: "Made to order",
    kind: "photo",
  },
  {
    id: "chicken-buns",
    name: "Chicken Buns",
    note: "Hearty chicken filling folded into soft, fresh-baked dough. A daily counter favourite.",
    tag: "Bestseller",
    kind: "wordmark",
  },
  {
    id: "pastries",
    name: "Pastries",
    note: "Flaky, golden and buttery — rolled, proofed and baked by hand through the morning.",
    src: galleryPhotos[5].src,
    tag: "Bestseller",
    kind: "photo",
  },
  {
    id: "donuts",
    name: "Donuts",
    note: "Fried golden, sugar-dusted and best eaten the moment they cool enough to hold.",
    tag: "Bestseller",
    kind: "wordmark",
  },
];

/* ── The full counter ── */
export const categories: Category[] = [
  {
    id: "buns",
    title: "Buns & Savoury",
    blurb: "Soft, fresh-baked and filled with flavour — the heart of the morning counter.",
    items: [
      { id: "bread", name: "Bread", note: "Baked fresh every morning — soft crumb, golden crust." },
      { id: "jam-bun", name: "Jam Bun", note: "Soft bun with a generous, sweet jam centre." },
      { id: "kombu-bun", name: "Kombu Bun", note: "A classic soft bun, glazed and baked till golden." },
      { id: "cream-bun", name: "Cream Bun", note: "Pillowy bun filled with silky sweet cream." },
      { id: "curry-bun", name: "Curry Bun", note: "Aromatic curry filling wrapped in fresh dough." },
      { id: "fish-bun", name: "Fish Bun", note: "Warm spiced fish tucked inside a soft bun." },
      { id: "chicken-bun", name: "Chicken Bun", note: "Hearty chicken filling in freshly baked dough." },
      { id: "pizza-bun", name: "Pizza Bun", note: "All the pizza flavours, in bun form." },
      { id: "omelette-bun", name: "Omelette Bun", note: "Fluffy omelette folded into a fresh bun." },
      { id: "egg-bun", name: "Egg Bun", note: "A golden egg baked into soft bread." },
    ],
  },
  {
    id: "cakes",
    title: "Cakes & Slices",
    blurb: "From everyday slices to celebration centrepieces.",
    items: [
      { id: "brownies", name: "Brownies", note: "Dense, fudgy and rich — our signature square." },
      { id: "butter-cake", name: "Butter Cake", note: "Tender, buttery crumb made the traditional way." },
      { id: "sponge-cake", name: "Sponge Cake", note: "Light as air and delicately sweet." },
      { id: "chocolate-cake", name: "Chocolate Cake", note: "Moist chocolate layers, made for celebrations." },
    ],
  },
  {
    id: "sweet-treats",
    title: "Sweet Treats",
    blurb: "Little indulgences for the afternoon, the school run and everything between.",
    items: [
      { id: "donuts", name: "Donuts", note: "Fried golden, sugar-dusted and best eaten fresh." },
      { id: "pastries", name: "Pastries", note: "Flaky, golden and buttery, baked by hand." },
      { id: "cookies", name: "Cookies", note: "Crisp edges, soft centres — baked in small batches." },
      { id: "muffin-cakes", name: "Muffin Cakes", note: "Domed, tender and full of flavour." },
    ],
  },
];

/* ── Our story ── */
export const story = {
  eyebrow: "Our Story",
  headingTop: "A home bakery in the",
  headingItalic: "spirit of அட்சயம்",
  tamilWord: "அட்சயம்",
  tamilMeaning:
    "Atchayam (அட்சயம்) is the Tamil word for abundance — prosperity that never runs dry, that keeps growing. It is the name we bake under, and the promise we keep in every batch.",
  founder:
    "Aathiththiya founded Atchayam Home Bakers in February 2026, out of a deep passion for baking and a wish to share freshly made food with everyone. From a home kitchen in Kilinochchi, every recipe is developed slowly and baked by hand — with quality, good taste and freshness at an honest price.",
  quote: "Quality and Taste are Our Identity.",
  pillars: [
    {
      k: "01",
      t: "Baked fresh, daily",
      d: "The counter is refilled all day — from 7 in the morning until late evening, what you buy was baked close to when you buy it.",
    },
    {
      k: "02",
      t: "Quality, honestly",
      d: "Real ingredients, small batches and careful hands. No shortcuts — just baking we are proud to put our name on.",
    },
    {
      k: "03",
      t: "Homemade care",
      d: "Every order is made like it is for family, and priced so that good baking belongs to everyone.",
    },
  ],
} as const;

/* ── Ordering ── */
export const ordering = {
  eyebrow: "How to Order",
  heading: "Fresh to you,",
  headingItalic: "one message away",
  steps: [
    {
      k: "01",
      t: "Message us",
      d: "Send us a WhatsApp or call 074 384 2935 with what you'd like. We'll confirm availability and timing.",
    },
    {
      k: "02",
      t: "We bake it fresh",
      d: "Regular items are baked daily and ready to collect. Custom cakes and larger orders are booked in advance.",
    },
    {
      k: "03",
      t: "Collect or delivered",
      d: "Visit us at Ambalkulam, Kilinochchi — or arrange delivery depending on the order and where you are.",
    },
  ],
  customTitle: "Made to order",
  customIntro: "Tell us what you're celebrating — we'll design and bake it:",
  customTags: [
    "Birthday & celebration cakes",
    "Customised cake designs",
    "Brownie boxes",
    "Cake & dessert boxes",
    "Party & event orders",
    "Bulk & catering",
  ],
  allergenNote:
    "A note on allergies — our bakes may contain wheat/flour, eggs, milk and dairy, butter, sugar, chocolate/cocoa and nuts. Please let us know of any dietary needs when you order, and we'll check the ingredients for you.",
} as const;

/* ── Visit us ── */
export const visit = {
  eyebrow: "Visit Us",
  heading: "Find the bakery",
  address: "153/1, Ambalkulam,\nKilinochchi, Sri Lanka",
  hoursLine: "Open every day",
  hours: "7:00 AM — 9:30 PM",
  phone: "074 384 2935",
  email: "atchayamhomebakers@gmail.com",
  instagram: "@atchayam_home_bakers",
  instagramUrl: "https://www.instagram.com/atchayam_home_bakers",
} as const;

export const brand = {
  name: "ATCHAYAM",
  tamil: "அட்சயம்",
  tagline: "Home Bakers",
  full: "ATCHAYAM HOME BAKERS",
  est: "Since February 2026 · Ambalkulam, Kilinochchi",
} as const;
