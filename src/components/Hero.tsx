"use client";

import { motion } from "framer-motion";
import MockupUI from "./MockupUI";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";

// Initials + colors for the avatar stack in the social-proof nudge row.
// Must stay in sync with the avatar set used in SocialProof testimonials.
const SOCIAL_AVATARS = [
  { initial: "A", color: "bg-teal-500" },
  { initial: "M", color: "bg-violet-500" },
  { initial: "C", color: "bg-orange-500" },
  { initial: "L", color: "bg-blue-500" },
];

/*
 * Mobile feature pills — shown only below the `lg` breakpoint where the
 * full kanban mockup is hidden. Each pill communicates one of FlowPilot's
 * three pillars (Ideas / Tasks / Decisions).
 *
 * Lucide icons are used instead of emoji because:
 *  1. Emoji render differently across OSes (Apple, Android, Windows all differ).
 *  2. SVG icons inherit color via `currentColor`, making dark-mode theming trivial.
 *
 * Dark mode: each pill shifts from a pastel light tint (e.g. violet-50) to a
 * semi-transparent dark tint (violet-900/30) so the pill remains visible
 * without washing out the dark background.
 */
const MOBILE_PILLS = [
  {
    Icon: Lightbulb,
    label: "Ideas",
    bg:   "bg-violet-50 dark:bg-violet-900/30 border-violet-100 dark:border-violet-800",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    Icon: CheckSquare,
    label: "Tareas",
    bg:   "bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-800",
    text: "text-teal-600 dark:text-teal-400",
  },
  {
    Icon: BookOpen,
    label: "Decisiones",
    bg:   "bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800",
    text: "text-orange-600 dark:text-orange-400",
  },
];

/**
 * Hero
 *
 * Full-viewport opening section. Contains the main value proposition,
 * primary and secondary CTAs, a social-proof avatar row, and — on
 * desktop — the animated kanban product mockup.
 *
 * Responsive layout:
 *   Mobile (< lg): single column. MockupUI is hidden (hidden lg:flex) because
 *     a 580px kanban board compressed to 375px becomes illegible and cramped.
 *     Three compact icon pills communicate the product pillars instead.
 *   Desktop (≥ lg): two-column grid — copy left, mockup right.
 *
 * Animation:
 *   fadeUp drives the copy column (initial → visible on mount, not scroll).
 *   heroMockup drives the product preview with a slight delay so the copy
 *   lands first and the mockup slides in as a reveal.
 *
 * Typography:
 *   H1 uses `text-fluid-hero` (clamp 36px → 60px) defined in globals.css,
 *   eliminating the need for discrete breakpoint overrides.
 *
 * Dark mode:
 *   Body bg: white → slate-950
 *   Decorative blobs: pastel tints → dark tints at reduced opacity
 *   Badge / borders: light teal tints → dark teal tints
 *   Avatar ring: border-white → border-slate-950 (prevents ghost ring on dark bg)
 */
export default function Hero() {
  const { fadeUp, heroMockup } = useAnimationVariants();

  return (
    <section className="relative flex items-center pt-16 overflow-hidden bg-white dark:bg-slate-950 min-h-screen lg:min-h-screen">

      {/* Decorative background blobs — purely visual, hidden from assistive tech */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-right teal blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 dark:bg-teal-900/20 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
        {/* Bottom-left orange blob */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 dark:bg-orange-900/20 rounded-full blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left column: copy ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible" // triggers on mount, not on scroll — hero is always visible
          className="flex flex-col items-start"
        >
          {/* Pulsing dot + "early access" badge — creates urgency without being pushy */}
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" aria-hidden="true" />
            Acceso anticipado disponible
          </div>

          {/* H1 — clamp(36px, 4vw+1rem, 60px) — letter-spacing -0.025em for display size */}
          <h1 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-hero mb-5 max-w-xl">
            Del caos al flujo,{" "}
            {/* Teal span adds color contrast and breaks the visual monotony */}
            <span className="text-teal-600 dark:text-teal-400">en un solo lugar.</span>
          </h1>

          {/* Subheadline — restates the value prop in plain language */}
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
            FlowPilot reúne las ideas, tareas y decisiones de tu equipo en un
            espacio compartido. Menos ruido. Más avance.
          </p>

          {/* CTA pair — stacks on mobile (flex-col), side-by-side on sm+ (flex-row) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Primary CTA — orange (high-energy color signals action) */}
            <a
              href="#cta"
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900/40 active:scale-[0.98] text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 w-full sm:w-auto"
            >
              Solicitar acceso anticipado
            </a>
            {/* Secondary CTA — ghost style, doesn't compete with primary */}
            <a
              href="#caracteristicas"
              className="inline-flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 font-semibold px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 w-full sm:w-auto"
            >
              Ver cómo funciona
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Social-proof nudge — stacked avatars + waitlist count */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 w-full">
            {/*
              Avatar stack: negative margin (-space-x-2) creates overlap.
              border-white / dark:border-slate-950 creates a halo ring that
              visually separates overlapping avatars on any background.
            */}
            <div className="flex items-center -space-x-2 shrink-0" aria-hidden="true">
              {SOCIAL_AVATARS.map(({ initial, color }) => (
                <div
                  key={initial}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-white dark:border-slate-950 flex items-center justify-center text-white text-xs font-bold`}
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-200">+2,400 equipos</span>{" "}
              ya están en la lista de espera
            </p>
          </div>
        </motion.div>

        {/* ── Right column: product mockup (desktop only) ───────────── */}
        {/*
          The MockupUI kanban board is intentionally hidden on mobile.
          Reason: three columns of tiny text at 375px become unreadable
          and the layout breaks at narrow widths. On lg+ it gives stakeholders
          a clear, animated first impression of the actual product UI.
        */}
        <motion.div
          variants={heroMockup}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex justify-end"
        >
          <MockupUI />
        </motion.div>

        {/* ── Mobile feature pills (< lg only) ─────────────────────── */}
        {/*
          Three compact cards replace the mockup on small screens.
          They communicate FlowPilot's three pillars without layout issues.
          aria-hidden="true" because the same information is conveyed by
          the H1 and subheadline above — no need to read it twice.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3"
          aria-hidden="true"
        >
          {MOBILE_PILLS.map(({ Icon, label, bg, text }) => (
            <div
              key={label}
              className={`${bg} border rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 text-center`}
            >
              <Icon size={20} className={text} />
              <span className={`text-xs sm:text-sm font-semibold ${text}`}>{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
