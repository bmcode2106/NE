// file: app/page.tsx

import HeroSection from "@/components/HeroSection";
import PlayerDemo from "@/components/PlayerDemo";
import DocsSection from "@/components/DocsSection";

export default function Home() {
  return (
    <main role="main">
      <HeroSection />
      <PlayerDemo />
      <DocsSection />
      
      {/* 
        Bagian Faqs bisa ditambahkan di sini.
        Untuk sementara, kita beri id agar link #faqs di header berfungsi.
      */}
      <div id="faqs" className="h-96 bg-black flex items-center justify-center">
        <h2 className="text-3xl font-bold text-zinc-700">FAQs Section Coming Soon...</h2>
      </div>
    </main>
  );
}
