// file: app/page.tsx

import HeroSection from "@/components/HeroSection";
import PlayerDemo from "@/components/PlayerDemo";
import DocsSection from "@/components/DocsSection"; // 1. Impor DocsSection

export default function Home() {
  return (
    <main role="main">
      <HeroSection />
      <PlayerDemo />
      <DocsSection /> {/* 2. Tambahkan DocsSection di sini */}
      
      {/* Placeholder untuk bagian Faqs nanti */}
      <div id="faqs" className="h-screen bg-black"></div>
    </main>
  );
}
