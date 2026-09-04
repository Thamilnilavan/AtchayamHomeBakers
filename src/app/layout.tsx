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
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-espresso font-sans text-ivory">
        {children}
      </body>
    </html>
  );
}
