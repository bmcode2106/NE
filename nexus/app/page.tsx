// file: app/page.tsx

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main role="main">
      <HeroSection />
      {/* 
        Bagian lain seperti Player, Docs, dll. akan ditambahkan di sini nanti.
        Kita tambahkan div kosong dengan tinggi agar bisa scroll sedikit untuk melihat efek header.
      */}
      <div className="h-screen bg-black"></div>
    </main>
  );
}
