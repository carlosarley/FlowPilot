"use client";

import { Menu, X, Zap } from "lucide-react";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { useMobileMenu } from "@/hooks/useMobileMenu";

// Navigation items shared between desktop and mobile menus
const NAV_LINKS = [
  { label: "Características", href: "#caracteristicas" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Testimonios", href: "#testimonios" },
];

/**
 * Top-level navigation bar.
 *
 * Responsive behavior:
 * - Mobile (< md): hamburger button → slide-down drawer with 48px touch targets
 * - Desktop (≥ md): inline horizontal links + CTA buttons
 *
 * Scroll behavior: transparent on load → frosted-glass once the user scrolls.
 * Body scroll is locked while the mobile drawer is open (via useMobileMenu).
 */
export default function Nav() {
  const scrolled = useScrollDetection(20);
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
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
          <span className="font-heading font-bold text-slate-900 text-lg tracking-tight">
            FlowPilot
          </span>
        </a>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-slate-500 hover:text-teal-700 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="#cta"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm px-1"
          >
            Iniciar sesión
          </a>
          <a
            href="#cta"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-teal-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Solicitar acceso
          </a>
        </div>

        {/* Hamburger — visible only on mobile. 44×44px minimum touch target */}
        <button
          onClick={toggle}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      {/* Height-based CSS transition — no display:none flash */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-3 flex flex-col divide-y divide-slate-50">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              // min 48px height = adequate touch target per WCAG 2.5.5
              className="flex items-center text-slate-700 font-medium py-3.5 text-base hover:text-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
              onClick={close}
            >
              {label}
            </a>
          ))}
          {/* Full-width primary CTA at the bottom of the drawer */}
          <a
            href="#cta"
            className="mt-3 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-3.5 rounded-xl text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            onClick={close}
          >
            Solicitar acceso anticipado
          </a>
          {/* Safe-area padding for iPhones with home bar */}
          <div className="pb-safe" />
        </nav>
      </div>
    </header>
  );
}
