// file: components/ApiDocsCard.tsx
"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  text: string;
}

const CodeBlock = ({ text }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950/80 rounded-xl flex justify-between items-center p-4 border border-zinc-700/50 shadow-inner group-hover:border-purple-500/40 transition-colors duration-300">
      <code className="text-zinc-300 font-mono text-xs sm:text-sm overflow-x-auto pr-2 w-full">
        {text || 'Generating...'}
      </code>
      <button 
        onClick={handleCopy}
        className="text-zinc-400 hover:text-purple-400 flex-shrink-0 ml-3 p-2 rounded-lg bg-zinc-800/50 hover:bg-purple-500/20 border border-zinc-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-110" 
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
};


interface ApiDocsCardProps {
  title: string;
  descriptionNode: React.ReactNode;
  urlPath: string; // Menggunakan path, bukan URL lengkap
  codeExamplePath: string; // Menggunakan path untuk contoh kode
  domain: string; // Menerima domain sebagai prop
}

export const ApiDocsCard = ({ title, descriptionNode, urlPath, codeExamplePath, domain }: ApiDocsCardProps) => {
  const fullUrl = domain ? `${domain}${urlPath}` : '';
  const fullCodeExample = domain ? `<iframe src="${domain}${codeExamplePath}" frameborder="0" allowfullscreen></iframe>` : '';

  return (
    <div className="group bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-1">
      <div className="px-6 py-4 border-b border-zinc-700/50">
        <h3 className="text-xl sm:text-2xl font-bold text-white/90">{title}</h3>
      </div>
      <div className="p-6 space-y-6">
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          {descriptionNode}
        </p>
        
        <CodeBlock text={fullUrl} />
        
        <div className="space-y-3">
          <div className="text-zinc-400 text-xs sm:text-sm font-medium">Code Example:</div>
          <CodeBlock text={fullCodeExample} />
        </div>
      </div>
    </div>
  );
};
