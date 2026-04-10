"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider
 *
 * Wraps the entire app with next-themes context so any descendant can
 * read and change the current color scheme via `useTheme()`.
 *
 * Strategy: "class"
 *   next-themes adds/removes a `dark` class on <html>. Tailwind's
 *   `@custom-variant dark (&:is(.dark *))` rule in globals.css then
 *   activates every `dark:` utility automatically — no JS theming needed.
 *
 * defaultTheme: "system"
 *   Reads the OS preference (prefers-color-scheme) on first visit so
 *   users don't experience a jarring white flash if they prefer dark mode.
 *
 * enableSystem: true
 *   Keeps listening for OS-level theme changes at runtime (e.g. when the
 *   user changes their laptop display settings while the tab is open).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
