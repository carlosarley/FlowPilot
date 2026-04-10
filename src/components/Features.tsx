"use client";

import { motion } from "framer-motion";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Feature {
  icon: LucideIcon;
  number: string;      // decorative background number: "01", "02", "03"
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
  title: string;
  description: string;
  detail: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

/*
 * Each feature has a `number` field ("01"/"02"/"03") that renders as a large
 * decorative background element inside the card. This breaks the "icon-card
 * template" pattern — cards feel designed, not generated.
 */
const FEATURES: Feature[] = [
  {
    icon: Lightbulb,
    number: "01",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
    border: "border-violet-100 dark:border-violet-800",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    title: "Captura ideas al vuelo",
    description:
      "Un espacio compartido donde nada se pierde. El equipo aporta en tiempo real, sin threads interminables ni juntas innecesarias.",
    detail: "Notas de voz, texto, enlaces — todo en el mismo lugar.",
  },
  {
    icon: CheckSquare,
    number: "02",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/30",
    border: "border-teal-100 dark:border-teal-800",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    title: "Convierte ideas en tareas",
    description:
      "De la conversación a la acción en un clic. Asigna, prioriza y da seguimiento sin cambiar de herramienta ni perder el hilo.",
    detail: "Fechas, responsables, prioridades — sin fricciones.",
  },
  {
    icon: BookOpen,
    number: "03",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/30",
    border: "border-orange-100 dark:border-orange-800",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
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
 * Bento asymmetric grid — breaks the "three identical cards" template pattern:
 *
 *   Mobile (1 col):
 *     Card 1 | Card 2 | Card 3  (stacked)
 *
 *   md (2 col):
 *     [ Card 1 — full width, horizontal layout ]
 *     [ Card 2 ] [ Card 3 ]
 *
 *   lg (3 col):
 *     [ Card 1 — 2 cols wide, horizontal ] [ Card 2 — 1 col ]
 *     [ Card 3 — full width 3 cols, horizontal ]
 *
 * Cards 1 and 3 use a horizontal layout (icon + content side-by-side) on md+.
 * Each card has a large decorative background number (01/02/03) that reinforces
 * the non-generic feel.
 *
 * The section gets a subtle dot-grid background to visually differentiate it
 * from the white sections before and after.
 */
export default function Features() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="caracteristicas" className="py-16 sm:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">

      {/* Dot grid — adds texture that distinguishes this section from adjacent white sections */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-[0.07] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
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

        {/*
          Bento grid:
          - Row 1 on lg: card[0] (col-span-2 wide) + card[1] (col-span-1)
          - Row 2 on lg: card[2] (col-span-3 full width)
          - On md: card[0] full-width, card[1]+card[2] side by side
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Card 0 — wide on lg (2 cols), full-width on md, horizontal layout on md+ */}
          <FeatureCard feature={FEATURES[0]} spanClass="md:col-span-2 lg:col-span-2" horizontal />

          {/* Card 1 — standard single column */}
          <FeatureCard feature={FEATURES[1]} spanClass="md:col-span-1 lg:col-span-1" />

          {/* Card 2 — full width on all breakpoints, horizontal layout on md+ */}
          <FeatureCard feature={FEATURES[2]} spanClass="md:col-span-2 lg:col-span-3" horizontal />
        </motion.div>
      </div>
    </section>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

/**
 * FeatureCard
 *
 * @param spanClass  Tailwind col-span classes injected from the parent grid
 * @param horizontal When true, icon and content sit side-by-side on md+ screens.
 *                   Used for the wide/full-width cards in the bento grid.
 *
 * Decorative number (e.g. "01"):
 *   Positioned absolutely at the bottom-right of the card, very low opacity so it
 *   reads as texture rather than content. Provides visual anchoring and makes each
 *   card feel individually designed.
 */
function FeatureCard({
  feature,
  spanClass = "",
  horizontal = false,
}: {
  feature: Feature;
  spanClass?: string;
  horizontal?: boolean;
}) {
  const { staggerItem } = useAnimationVariants();
  const Icon = feature.icon;

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative rounded-2xl border ${feature.border} ${feature.hoverBorder} ${spanClass} bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-300 hover:-translate-y-0.5`}
    >
      {/*
        Decorative background number — absolute, bottom-right, low opacity.
        Uses the card's accent color at near-zero opacity so it harmonizes
        with the card's color family without competing with the content.
      */}
      <span
        className={`absolute -bottom-4 -right-2 text-[8rem] font-heading font-bold leading-none select-none pointer-events-none ${feature.color} opacity-[0.06] dark:opacity-[0.08] tabular-nums`}
        aria-hidden="true"
      >
        {feature.number}
      </span>

      {/* Card content — horizontal on md+ for wide cards, vertical otherwise */}
      <div className={`relative p-6 lg:p-8 h-full ${horizontal ? "md:flex md:items-start md:gap-8" : "flex flex-col"}`}>

        {/* Icon container */}
        <div
          className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center shrink-0 ${horizontal ? "mb-5 md:mb-0" : "mb-5"}`}
          aria-hidden="true"
        >
          <Icon size={22} className={feature.color} />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h3 mb-2.5">
            {feature.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            {feature.description}
          </p>
          <p className={`text-xs font-semibold ${feature.color}`}>
            {feature.detail}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
