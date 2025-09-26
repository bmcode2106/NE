// file: components/HeroSection.tsx
"use client";

import Link from 'next/link';
import { Play, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">
      {/* Efek Latar Belakang Gradien Animasi */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div 
            className="absolute -top-16 -right-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold leading-none">
              <span className="block text-white/60 font-light tracking-[0.2em] uppercase text-sm md:text-lg mb-6">
                Welcome to
              </span>
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                  NEX
                </span>
                <span className="absolute bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg text-3xl md:text-5xl lg:text-7xl -top-2 md:-top-4 left-full ml-0.5 md:ml-1.5">
                  US
                </span>
              </div>
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Your ultimate API for movies, TV shows, and anime. Stream your favorites with our advanced customizable player.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
          >
            <Link
              href="https://vidbox.to/home" // Ganti dengan link tujuan Anda
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-6 h-6" />
              Start Watching
            </Link>
            <Link
              href="#player"
              className="inline-flex items-center justify-center gap-3 bg-black/20 text-white px-8 py-3 text-lg font-semibold rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Library className="w-6 h-6" />
              Explore Player
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
