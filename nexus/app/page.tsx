// file: app/page.tsx

import HeroSection from "@/components/HeroSection";
import PlayerDemo from "@/components/PlayerDemo"; // 1. Impor komponen PlayerDemo

export default function Home() {
  return (
    <main role="main">
      <HeroSection />
      <PlayerDemo /> {/* 2. Tambahkan komponen PlayerDemo di sini */}
      
      {/* 
        Kita bisa hapus div kosong ini sekarang karena PlayerDemo sudah ada.
        Tetapi, biarkan dulu untuk memberi ruang bagi bagian Docs & Faqs nanti.
      */}
      <div className="h-screen bg-black"></div>
    </main>
  );
}
