// file: components/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Ini adalah cara yang benar dan aman untuk mendapatkan tipe props
// dari sebuah komponen React tanpa mengetahui struktur file internalnya.
type NextThemesProviderProps = React.ComponentProps<typeof NextThemesProvider>;

// Komponen kita sekarang menggunakan tipe yang diekstrak secara otomatis,
// jadi ini akan selalu valid dan type-safe.
export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
