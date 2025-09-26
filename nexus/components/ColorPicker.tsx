// file: components/ColorPicker.tsx
"use client";

import { useRef } from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ label, color, onColorChange }: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleColorBoxClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <div
        className="w-16 h-16 rounded-full border-4 border-zinc-700 ring-4 ring-purple-500/20 shadow-lg cursor-pointer transition-transform hover:scale-110"
        style={{ backgroundColor: color }}
        onClick={handleColorBoxClick}
      />
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
        className="sr-only" // Sembunyikan input warna asli
      />
      <input
        type="text"
        value={color.toUpperCase()}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-24 bg-zinc-800/50 border border-zinc-600/50 text-zinc-200 rounded-lg font-mono text-center py-1 text-sm focus:border-purple-500/50 focus:outline-none"
      />
    </div>
  );
};
