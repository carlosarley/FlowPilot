"use client";

import { Menu, X, Zap } from "lucide-react";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { ThemeToggle } from "./ThemeToggle";

// Shared between desktop links and mobile drawer — single source of truth.
const NAV_LINKS = [
  { label: "Características", href: "#caracteristicas" },
  { label: "Beneficios",      href: "#beneficios" },
  { label: "Testimonios",     href: "#testimonios" },
];

/**
 * Nav
 *
 * Top-level navigation bar, fixed to the viewport top (z-50).
 *
 * Scroll behavior:
 *   Transparent when the page is at the top → frosted-glass backdrop once
 *   the user scrolls 20px. The threshold is low so the transition fires
 *   immediately and doesn't leave a transparent bar over content.
 *
 * Responsive layout:
 *   Mobile (< md): hamburger + theme toggle → slide-down drawer
 *   Desktop (≥ md): inline links + theme toggle + CTA buttons
 *
 * Dark mode:
 *   Scrolled state: white/95 → slate-900/95 (same frosted-glass effect on dark bg)
 *   Border: slate-100 → slate-800
 *   Text: slate-500 → slate-400 (same muted weight, visible on dark bg)
 *   Hover text: teal-700 → teal-400 (teal-700 is too dark on slate-900)
 *
 * Body scroll lock:
 *   useMobileMenu locks `document.body` overflow while the drawer is open,
 *   preventing background scroll on iOS Safari.
 */
export default function Nav() {
  const scrolled = useScrollDetection(20);
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          // Frosted glass: semi-transparent bg + blur + bottom border
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      {/* ── Main bar ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand mark — clicking scrolls to top (href="#") */}
        <a
          href="#"
          className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-700 transition-colors">
            <Zap size={16} className="text-white fill-white" />
          </div>
          {/* font-heading = Outfit, set via CSS variable in globals.css */}
          <span className="font-heading font-bold text-slate-900 dark:text-white text-lg tracking-tight">
            FlowPilot
          </span>
        </a>

        {/* Desktop nav links — hidden below md breakpoint */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              // teal-700 hover provides enough contrast on white bg;
              // teal-400 is used in dark mode because teal-700 is too dark there.
              className="text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs + theme toggle */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* ThemeToggle renders a 36px Sun/Moon icon button */}
          <ThemeToggle />
          <a
            href="#cta"
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm px-1"
          >
            Iniciar sesión
          </a>
          <a
            href="#cta"
            // Primary CTA — teal fill, darkens on hover, shadow on hover
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-teal-200 dark:hover:shadow-teal-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Solicitar acceso
          </a>
        </div>

        {/* Mobile controls — theme toggle + hamburger, visible below md only */}
        <div className="md:hidden flex items-center gap-1 -mr-1">
          <ThemeToggle />
          <button
            onClick={toggle}
            // Minimum 44×44px touch target per WCAG 2.5.5
            className="flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Icon swaps between hamburger and X based on drawer state */}
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      {/*
        CSS max-height transition instead of display:none — avoids a FOUC
        (flash of unstyled content) because the element stays in the DOM.
        pointer-events-none when closed so invisible links can't be tabbed to.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-3 flex flex-col divide-y divide-slate-50 dark:divide-slate-800">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              // py-3.5 → ~56px total height, comfortably above the 48px touch guideline
              className="flex items-center text-slate-700 dark:text-slate-200 font-medium py-3.5 text-base hover:text-teal-700 dark:hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
              onClick={close} // close drawer on navigation
            >
              {label}
            </a>
          ))}

          {/* Full-width teal CTA at the bottom of the drawer */}
          <a
            href="#cta"
            className="mt-3 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-3.5 rounded-xl text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            onClick={close}
          >
            Solicitar acceso anticipado
          </a>

          {/* Fills the iPhone home-bar safe area so the last item isn't clipped */}
          <div className="pb-safe" />
        </nav>
      </div>
    </header>
  );
}
