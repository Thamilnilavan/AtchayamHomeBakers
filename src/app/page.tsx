import {
  BakesSection,
  CounterSection,
  HeroSection,
  OrderSection,
  SiteFooter,
  SiteNav,
  StorySection,
  VisitSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative">
      <SiteNav />
      <HeroSection />
      <StorySection />
      <BakesSection />
      <CounterSection />
      <OrderSection />
      <VisitSection />
      <SiteFooter />
    </main>
  );
}
