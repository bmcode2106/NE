// file: components/MobileMenu.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
// HAPUS IMPOR YANG TIDAK TERPAKAI: SquarePlay, BookOpenCheck, CircleHelp
import { Send, BotMessageSquare } from 'lucide-react';

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
        onClick={(e) => e.stopPropagation()}
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
        
        <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-lg font-semibold text-white/90">Community</h3>
            <p className="text-sm text-white/60 max-w-xs">
              Join our community for updates and support!
            </p>
            {/* Menggabungkan kedua ikon sosial media ke sini agar konsisten */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:scale-110 transition-all duration-200">
                <BotMessageSquare className="w-6 h-6 text-white" />
              </a>
              <a href="https://t.me/your-channel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:scale-110 transition-all duration-200">
                <Send className="w-6 h-6 text-white" />
              </a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
