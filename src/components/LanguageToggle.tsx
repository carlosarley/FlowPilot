"use client";

// ── LanguageToggle ────────────────────────────────────────────────────────────
//
// Pill-style EN / ES switcher that lives in the Nav alongside ThemeToggle.
//
// Design rationale:
//   - The active language sits inside a white (light) / slate-700 (dark) pill
//     with a shadow, visually "lifted" above the inactive option.
//   - The inactive option is muted text — present but not competing for attention.
//   - The outer rounded container uses bg-slate-100/dark:bg-slate-800 to blend
//     naturally with the nav at rest and become visible on scroll (frosted bg).
//   - `aria-pressed` on each button communicates the selection state to screen
//     readers without needing a visually hidden label.

import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const OPTIONS: { value: Lang; ariaLabel: string }[] = [
  { value: "en", ariaLabel: "Switch to English" },
  { value: "es", ariaLabel: "Cambiar a español" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5"
      role="group"
      aria-label="Language selector"
    >
      {OPTIONS.map(({ value, ariaLabel }) => (
        <button
          key={value}
          onClick={() => setLang(value)}
          aria-label={ariaLabel}
          aria-pressed={lang === value}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
            lang === value
              // Active: lifted white/dark pill
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
              // Inactive: muted, no background
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
