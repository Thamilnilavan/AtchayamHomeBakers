import {
  BakesSection,
  CounterSection,
  GalleryStrip,
  HeroSection,
  MarqueeRibbon,
  MobileOrderBar,
  OrderSection,
  SiteFooter,
  SiteNav,
  StorySection,
  VisitSection,
  TestimonialsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative">
      <SiteNav />
      <HeroSection />
      <MarqueeRibbon />
      <StorySection />
      <BakesSection />
      <CounterSection />
      <OrderSection />
      <TestimonialsSection />
      <GalleryStrip />
      <VisitSection />
      <SiteFooter />
      <MobileOrderBar />
    </main>
  );
}
