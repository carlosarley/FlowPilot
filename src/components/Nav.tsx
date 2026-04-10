"use client";

import { Menu, X, Zap } from "lucide-react";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Nav
 *
 * Top-level navigation bar, fixed to the viewport top (z-50).
 *
 * Scroll behavior:
 *   Transparent when the page is at the top → frosted-glass backdrop once
 *   the user scrolls 20px.
 *
 * Responsive layout:
 *   Mobile (< md): hamburger + theme toggle + language toggle → slide-down drawer
 *   Desktop (≥ md): inline links + language toggle + theme toggle + CTA buttons
 *
 * i18n:
 *   All user-visible strings come from `t` (the active language's translations).
 *   The LanguageToggle lets users switch between EN and ES without a page reload.
 */
export default function Nav() {
  const scrolled = useScrollDetection(20);
  const { isOpen, toggle, close } = useMobileMenu();
  const { t } = useLanguage();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      {/* ── Main bar ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand mark */}
        <a
          href="#"
          className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-700 transition-colors">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-heading font-bold text-slate-900 dark:text-white text-lg tracking-tight">
            FlowPilot
          </span>
        </a>

        {/* Desktop nav links — hidden below md */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label={t.nav.ariaNav}
        >
          {t.nav.links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop controls: language + theme + CTA buttons */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#cta"
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm px-1"
          >
            {t.nav.signin}
          </a>
          <a
            href="#cta"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-teal-200 dark:hover:shadow-teal-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile controls: language + theme + hamburger */}
        <div className="md:hidden flex items-center gap-1 -mr-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={toggle}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label={isOpen ? t.nav.ariaClose : t.nav.ariaMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label={t.nav.ariaDrawer}
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-3 flex flex-col divide-y divide-slate-50 dark:divide-slate-800">
          {t.nav.links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="flex items-center text-slate-700 dark:text-slate-200 font-medium py-3.5 text-base hover:text-teal-700 dark:hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
              onClick={close}
            >
              {label}
            </a>
          ))}

          <a
            href="#cta"
            className="mt-3 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-3.5 rounded-xl text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            onClick={close}
          >
            {t.nav.ctaMobile}
          </a>

          <div className="pb-safe" />
        </nav>
      </div>
    </header>
  );
}
