import type { Metadata } from "next";
import { Playfair_Display, Manrope, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATCHAYAM Home Bakers — Fresh from our home kitchen",
  description:
    "ATCHAYAM Home Bakers — அட்சயம். A home bakery in Ambalkulam, Kilinochchi baking bread, buns, cakes, brownies, pastries and sweets fresh every day. Order on WhatsApp.",
  keywords: [
    "ATCHAYAM",
    "home bakers",
    "bakery Kilinochchi",
    "Ambalkulam bakery",
    "brownies",
    "celebration cakes",
    "Sri Lankan home bakery",
  ],
  openGraph: {
    title: "ATCHAYAM Home Bakers",
    description:
      "A home bakery in the spirit of அட்சயம் — abundance. Fresh bread, buns, cakes and sweets, baked daily in Kilinochchi.",
    type: "website",
    locale: "en_LK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "ATCHAYAM Home Bakers",
    "image": "/atchayam-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "153/1, Ambalkulam",
      "addressLocality": "Kilinochchi",
      "addressCountry": "LK",
    },
    "telephone": "+94743842935",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "07:00",
        "closes": "21:30",
      },
    ],
    "sameAs": [
      "https://www.instagram.com/atchayam_home_bakers",
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-espresso font-sans text-ivory">
        {children}
      </body>
    </html>
  );
}
