// file: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus - Layanan Streaming API",
  description: "Platform API untuk embed streaming film, TV, dan anime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        {/* 'children' ini adalah tempat di mana konten dari page.tsx akan dirender */}
        {children} 
        <Footer />
      </body>
    </html>
  );
}
