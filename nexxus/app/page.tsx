// file: app/page.tsx

import HeroSection from "@/components/HeroSection";
import PlayerDemo from "@/components/PlayerDemo";
import DocsSection from "@/components/DocsSection";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <main role="main">
      <HeroSection />
      <PlayerDemo />
      <DocsSection />
      <FaqSection />
    </main>
  );
}
