"use client";

import { motion } from "framer-motion";
import MockupUI from "./MockupUI";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// Avatar stack shown below the CTAs as a social-proof nudge
const SOCIAL_AVATARS = [
  { initial: "A", color: "bg-teal-500" },
  { initial: "M", color: "bg-violet-500" },
  { initial: "C", color: "bg-orange-500" },
  { initial: "L", color: "bg-blue-500" },
];

/**
 * Hero section.
 *
 * Responsive layout:
 * - Mobile (< lg): single column, copy only — mockup is hidden to avoid
 *   rendering a complex 580px UI crammed into a 375px viewport.
 * - Desktop (≥ lg): two-column grid — copy left, mockup right.
 *
 * Typography:
 * - H1 uses `text-fluid-hero` (clamp 36px → 60px) for smooth scaling across
 *   all viewports without discrete breakpoint jumps.
 */
export default function Hero() {
  const { fadeUp, heroMockup } = useAnimationVariants();

  return (
    <section className="relative flex items-center pt-16 overflow-hidden bg-white min-h-screen lg:min-h-screen">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left column: copy ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Early-access badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" aria-hidden="true" />
            Acceso anticipado disponible
          </div>

          {/* Fluid hero headline — clamp(36px, 4vw+1rem, 60px) */}
          <h1 className="font-heading font-bold text-slate-900 text-fluid-hero mb-5 max-w-xl">
            Del caos al flujo,{" "}
            <span className="text-teal-600">en un solo lugar.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
            FlowPilot reúne las ideas, tareas y decisiones de tu equipo en un
            espacio compartido. Menos ruido. Más avance.
          </p>

          {/* CTA pair — stacks on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#cta"
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 w-full sm:w-auto"
            >
              Solicitar acceso anticipado
            </a>
            <a
              href="#caracteristicas"
              className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-teal-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-200 hover:border-teal-200 transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 w-full sm:w-auto"
            >
              Ver cómo funciona
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Social-proof nudge */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-slate-100 w-full">
            <div className="flex items-center -space-x-2 shrink-0" aria-hidden="true">
              {SOCIAL_AVATARS.map(({ initial, color }) => (
                <div
                  key={initial}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">+2,400 equipos</span>{" "}
              ya están en la lista de espera
            </p>
          </div>
        </motion.div>

        {/* ── Right column: product mockup (desktop only) ───────────── */}
        {/*
          Hidden on mobile: the kanban board has 3 columns of tiny text that
          become illegible and cramped at 375px. On lg+ it renders at full
          fidelity, giving stakeholders a clear product preview.
        */}
        <motion.div
          variants={heroMockup}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex justify-end"
        >
          <MockupUI />
        </motion.div>

        {/* ── Mobile product teaser (< lg only) ────────────────────── */}
        {/*
          On mobile we show 3 compact feature pills instead of the full mockup.
          This communicates the product's three pillars without the layout issues.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3"
          aria-hidden="true"
        >
          {[
            { emoji: "💡", label: "Ideas", color: "bg-violet-50 border-violet-100" },
            { emoji: "✓", label: "Tareas", color: "bg-teal-50 border-teal-100" },
            { emoji: "◎", label: "Decisiones", color: "bg-orange-50 border-orange-100" },
          ].map(({ emoji, label, color }) => (
            <div
              key={label}
              className={`${color} border rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 text-center`}
            >
              <span className="text-xl sm:text-2xl">{emoji}</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
