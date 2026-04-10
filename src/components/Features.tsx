"use client";

import { motion } from "framer-motion";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Feature {
  icon: LucideIcon;
  // Tailwind class for the icon color and the detail line text color.
  // Includes a dark: variant because accent colors need to be one step
  // lighter in dark mode to maintain WCAG AA contrast (e.g. violet-600 → violet-400).
  color: string;
  // Icon container background (tint of the same accent color family).
  bg: string;
  // Card border — default state.
  border: string;
  // Card border — hover state. Kept separate so each card can have its own hue.
  hoverBorder: string;
  title: string;
  description: string;
  // Short reinforcing tagline displayed at the bottom of each card in accent color.
  detail: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

/*
 * Each feature maps to one of FlowPilot's three core pillars:
 *   1. Capture (violet)  — ideas, notes, voice memos
 *   2. Execute (teal)    — tasks, assignments, priorities
 *   3. Decide (orange)   — decisions, history, accountability
 *
 * Dark mode strategy for accent classes:
 *   - `color`: 600 → 400 (lighter = more readable on dark bg)
 *   - `bg`: -50 → -900/30 (dark semi-transparent tint instead of pastel)
 *   - `border` / `hoverBorder`: -100/-200 → -800/-700 (visible on slate-900 card)
 */
const FEATURES: Feature[] = [
  {
    icon: Lightbulb,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
    border: "border-violet-100 dark:border-violet-800",
    hoverBorder: "hover:border-violet-200 dark:hover:border-violet-700",
    title: "Captura ideas al vuelo",
    description:
      "Un espacio compartido donde nada se pierde. El equipo aporta en tiempo real, sin threads interminables ni juntas innecesarias.",
    detail: "Notas de voz, texto, enlaces — todo en el mismo lugar.",
  },
  {
    icon: CheckSquare,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/30",
    border: "border-teal-100 dark:border-teal-800",
    hoverBorder: "hover:border-teal-200 dark:hover:border-teal-700",
    title: "Convierte ideas en tareas",
    description:
      "De la conversación a la acción en un clic. Asigna, prioriza y da seguimiento sin cambiar de herramienta ni perder el hilo.",
    detail: "Fechas, responsables, prioridades — sin fricciones.",
  },
  {
    icon: BookOpen,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/30",
    border: "border-orange-100 dark:border-orange-800",
    hoverBorder: "hover:border-orange-200 dark:hover:border-orange-700",
    title: "Toma decisiones con contexto",
    description:
      "FlowPilot registra el porqué de cada decisión. Siempre sabes qué se decidió, quién lo decidió y por qué se llegó ahí.",
    detail: "Histórico completo. Nunca más '¿por qué lo hicimos así?'",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Features
 *
 * Three-pillar section that explains what FlowPilot does.
 *
 * Layout:
 *   Mobile:  1 column → each card full-width, generous padding (p-6)
 *   md:      2 columns
 *   lg:      3 columns, larger padding (p-8)
 *
 * Animation:
 *   Cards stagger in with a 120ms delay between each (defined in
 *   `staggerContainer` / `staggerItem` inside useAnimationVariants).
 *   `margin: "-60px"` on the viewport means the animation fires 60px
 *   before the section enters the viewport — feels more natural.
 *
 * Dark mode:
 *   Section bg: white → slate-950
 *   Card bg:    white → slate-900 (one step lighter than section = subtle depth)
 *   Box shadow: default slate → slate-900/50 (softer on dark backgrounds)
 */
export default function Features() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="caracteristicas" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header — left-aligned, max-width keeps it readable */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          {/* Eyebrow label — uppercase + wide tracking = section tag convention */}
          <span className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Características
          </span>
          <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3 mb-4">
            Tres piezas. Un solo flujo.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            La mayoría de los equipos pierden tiempo saltando entre apps. FlowPilot
            conecta el pensamiento con la ejecución, sin interrupciones.
          </p>
        </div>

        {/* Staggered card grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          // margin "-60px" = start animation 60px before section scrolls into view
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

/**
 * FeatureCard
 *
 * Individual feature card with:
 *   - Accent-colored icon container (tinted bg + icon)
 *   - Title, description, and a short tagline in accent color
 *   - Hover: slight upward lift (-translate-y-1) + shadow
 *
 * `useAnimationVariants` is called here (not in the parent) so each card
 * gets its own `staggerItem` variant reference — required for Framer Motion
 * stagger to work correctly when variants are defined per-instance.
 */
function FeatureCard({ feature }: { feature: Feature }) {
  const { staggerItem } = useAnimationVariants();
  const Icon = feature.icon;

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative rounded-2xl border ${feature.border} ${feature.hoverBorder} p-6 lg:p-8 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900`}
    >
      {/* Icon container — tinted circle, matches the feature's color family */}
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 sm:mb-6`}
        aria-hidden="true"
      >
        <Icon size={20} className={feature.color} />
      </div>

      {/* text-fluid-h3 = clamp(18px, 1vw+0.75rem, 22px) */}
      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h3 mb-2.5">
        {feature.title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
        {feature.description}
      </p>

      {/* Short reinforcing tagline — accent color + small text draws the eye last */}
      <p className={`text-xs font-semibold ${feature.color}`}>
        {feature.detail}
      </p>
    </motion.article>
  );
}
