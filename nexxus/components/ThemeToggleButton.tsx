// file: components/ThemeToggleButton.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect hanya berjalan di client, ini untuk menghindari hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Tampilkan placeholder agar layout tidak bergeser
    return <div className="h-10 w-10"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-800" />
      )}
    </button>
  );
}
