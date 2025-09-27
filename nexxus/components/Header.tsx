// file: components/Header.tsx
"use client"; // Menandakan ini adalah komponen klien

import { useState } from 'react';
import Link from 'next/link';
import { Tv, SquarePlay, BookOpenCheck, CircleHelp, Menu, X, BotMessageSquare, Send } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // INI BARIS YANG DIPERBAIKI
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-6 bg-transparent">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Bagian Logo dan Nama Brand: Nexus */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Tv className="w-8 h-8 text-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Nexus
            </span>
          </Link>

          {/* Bagian Navigasi untuk Desktop */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-1 mr-3">
              <Link href="#player" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-200 group relative">
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <SquarePlay className="text-white/70 group-hover:text-white transition-colors duration-200 relative z-10 h-4 w-4" />
                <span className="font-medium text-sm tracking-wide text-white/90 group-hover:text-white transition-colors duration-200 relative z-10">Player</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-200 group relative">
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <BookOpenCheck className="text-white/70 group-hover:text-white transition-colors duration-200 relative z-10 h-4 w-4" />
                <span className="font-medium text-sm tracking-wide text-white/90 group-hover:text-white transition-colors duration-200 relative z-10">Docs</span>
              </Link>
              <Link href="#faqs" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-200 group relative">
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <CircleHelp className="text-white/70 group-hover:text-white transition-colors duration-200 relative z-10 h-4 w-4" />
                <span className="font-medium text-sm tracking-wide text-white/90 group-hover:text-white transition-colors duration-200 relative z-10">Faqs</span>
              </Link>
            </nav>
            
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>

            {/* Ikon Sosial Media */}
            <div className="flex items-center gap-0">
              <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200">
                <BotMessageSquare className="w-5 h-5 text-white" />
              </a>
              <a href="https://t.me/your-channel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200">
                <Send className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Tombol Menu untuk Mobile */}
          <button 
            onClick={toggleMenu}
            className="inline-flex items-center justify-center h-10 w-10 md:hidden hover:bg-white/10 hover:scale-110 transition-all duration-200 rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
