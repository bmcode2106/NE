// file: components/Footer.tsx

import Link from 'next/link';
import { Tv, BotMessageSquare, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950/50 border-t border-zinc-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Bagian Kiri: Branding */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Tv className="w-8 h-8 text-purple-500 transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Nexus
              </span>
            </Link>
            <p className="mt-4 text-zinc-400 text-sm max-w-xs">
              The ultimate API for seamless video streaming integration. Built for developers, loved by users.
            </p>
          </div>

          {/* Bagian Kanan: Navigasi */}
          <div className="flex flex-wrap gap-10">
            <div>
              <h3 className="font-semibold text-white mb-4">Navigation</h3>
              <nav className="flex flex-col gap-3">
                <Link href="#player" className="text-zinc-400 hover:text-purple-400 transition-colors">Player Demo</Link>
                <Link href="#docs" className="text-zinc-400 hover:text-purple-400 transition-colors">API Docs</Link>
                <Link href="#faqs" className="text-zinc-400 hover:text-purple-400 transition-colors">FAQs</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <nav className="flex flex-col gap-3">
                <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 transition-colors">Discord</a>
                <a href="https://t.me/your-channel" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 transition-colors">Telegram</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="border-zinc-800 my-8" />

        {/* Bagian Bawah: Copyright dan Ikon Sosial */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {currentYear} Nexus. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors" aria-label="Discord">
              <BotMessageSquare className="w-5 h-5 text-zinc-400" />
            </a>
            <a href="https://t.me/your-channel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
