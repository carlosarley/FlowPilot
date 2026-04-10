"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * ThemeToggle
 *
 * A 36×36px icon button that switches between light and dark mode.
 * Placed inside the Nav on both desktop (alongside the CTAs) and mobile
 * (alongside the hamburger button).
 *
 * Hydration-safe pattern:
 *   next-themes reads the stored theme from localStorage on the client only.
 *   On the server (and during SSR/hydration), `resolvedTheme` is undefined.
 *   Rendering a theme-dependent icon server-side would cause a React hydration
 *   mismatch — the server renders Moon, the client renders Sun (or vice-versa).
 *
 *   Fix: track a `mounted` flag with useEffect. Before mount, render a
 *   same-size invisible placeholder `<div>` to hold the layout space without
 *   triggering a mismatch. After mount, swap in the real button.
 *
 * Why `resolvedTheme` instead of `theme`:
 *   `theme` can be "system", which doesn't tell us the actual light/dark value.
 *   `resolvedTheme` always returns "light" or "dark" — the final computed value
 *   after accounting for the OS preference — so the correct icon is shown.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Signal that the component has hydrated; safe to render theme-dependent UI.
  useEffect(() => setMounted(true), []);

  // Hold the exact button dimensions so the layout doesn't shift on mount.
  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // 36×36px — meets the 44×44px touch target guideline when the Nav's
      // flex gap provides the extra tap area around it.
      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {/* Sun = user is in dark mode and can switch to light; Moon = vice-versa */}
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
