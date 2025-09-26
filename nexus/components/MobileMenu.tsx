// file: components/MobileMenu.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SquarePlay, BookOpenCheck, CircleHelp, Send } from 'lucide-react'; // Mengganti Rss dengan Send

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-zinc-900/90 p-6 pt-24"
        onClick={(e) => e.stopPropagation()} // Mencegah menu tertutup saat diklik di dalam area menu
      >
        <nav className="flex flex-col gap-4 text-center">
          <Link href="#player" onClick={onClose} className="text-xl font-semibold text-white/80 hover:text-white transition-colors py-2">
            Player
          </Link>
          <Link href="/docs" onClick={onClose} className="text-xl font-semibold text-white/80 hover:text-white transition-colors py-2">
            Docs
          </Link>
          <Link href="#faqs" onClick={onClose} className="text-xl font-semibold text-white/80 hover:text-white transition-colors py-2">
            Faqs
          </Link>
        </nav>
        
        <div className="w-full h-px bg-white/10 my-6"></div>
        
        {/* Bagian Komunitas Telegram */}
        <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-lg font-semibold text-white/90">Community</h3>
            <p className="text-sm text-white/60 max-w-xs">
              Join our community on Telegram for updates and support!
            </p>
            <a 
              href="https://t.me/your-channel" // Ganti dengan link channel Telegram Anda
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 mt-2"
            >
              <Send className="w-6 h-6 text-white" /> {/* Ikon sudah diganti */}
            </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
