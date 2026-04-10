"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Wraps the app with next-themes. Uses the "class" attribute strategy so
// Tailwind's dark: variant fires when <html class="dark"> is set.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
