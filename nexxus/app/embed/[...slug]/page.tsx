// file: app/embed/[...slug]/page.tsx
"use client";

import { useState, useEffect } from 'react';

// Tipe untuk menampung data konfigurasi iklan
interface AdConfig {
  enabled: boolean;
  clicks_needed: number;
  ad_tag_script_url: string;
}

// Tipe untuk seluruh konfigurasi
interface AppConfig {
  ads: AdConfig;
}

export default function EmbedPlayer({ params }: { params: { slug: string[] } }) {
  const [clickCount, setClickCount] = useState(0);
  const [adShown, setAdShown] = useState(false);
  const [config, setConfig] = useState<AppConfig | null>(null);

  // 1. Ambil konfigurasi dari /config.json saat komponen dimuat
  useEffect(() => {
    fetch('/config.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setConfig(data);
        console.log("Konfigurasi iklan berhasil dimuat:", data);
      })
      .catch(error => {
        console.error("Gagal memuat konfigurasi iklan:", error);
      });
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  // Fungsi untuk menampilkan iklan
  const showAd = () => {
    if (!config || !config.ads.ad_tag_script_url) return;

    console.log("Menjalankan script iklan dari:", config.ads.ad_tag_script_url);
    
    // Buat tag script dan tambahkan ke body
    const script = document.createElement('script');
    script.src = config.ads.ad_tag_script_url;
    script.async = true;
    document.body.appendChild(script);

    setAdShown(true);
  };

  // Fungsi yang dipanggil setiap kali ada klik di area player
  const handlePlayerClick = () => {
    // Jangan lakukan apa-apa jika config belum dimuat atau iklan dinonaktifkan
    if (!config || !config.ads.enabled || adShown) {
      return;
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Cek apakah jumlah klik sudah mencapai target
    if (newClickCount >= config.ads.clicks_needed) {
      showAd();
    }
  };

  // Mendapatkan parameter dari URL (misal: ['movie', '597'])
  const [type, id, season, episode] = params.slug;
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  
  // URL video asli yang akan diputar (misalnya dari VidPlus)
  const vidplusBaseUrl = 'https://player.vidplus.to/embed/';
  let videoSrc = '';
  if (type === 'movie') {
    videoSrc = `${vidplusBaseUrl}movie/${id}`;
  } else if (type === 'tv') {
    videoSrc = `${vidplusBaseUrl}tv/${id}/${season}/${episode}`;
  } else if (type === 'anime') {
    videoSrc = `${vidplusBaseUrl}anime/${id}/${episode}?${searchParams.toString()}`;
  }

  return (
    // Div ini membungkus seluruh player dan menangani klik untuk iklan
    <div 
      className="w-screen h-screen bg-black"
      onClick={handlePlayerClick}
    >
      {/* Ini adalah iframe yang memutar video asli dari sumbernya */}
      {videoSrc && (
        <iframe
          src={videoSrc}
          className="w-full h-full border-0"
          title="Video Player"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
