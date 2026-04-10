"use client";

import { motion } from "framer-motion";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Feature {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
  title: string;
  description: string;
  detail: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: Lightbulb,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-200",
    title: "Captura ideas al vuelo",
    description:
      "Un espacio compartido donde nada se pierde. El equipo aporta en tiempo real, sin threads interminables ni juntas innecesarias.",
    detail: "Notas de voz, texto, enlaces — todo en el mismo lugar.",
  },
  {
    icon: CheckSquare,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    hoverBorder: "hover:border-teal-200",
    title: "Convierte ideas en tareas",
    description:
      "De la conversación a la acción en un clic. Asigna, prioriza y da seguimiento sin cambiar de herramienta ni perder el hilo.",
    detail: "Fechas, responsables, prioridades — sin fricciones.",
  },
  {
    icon: BookOpen,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-200",
    title: "Toma decisiones con contexto",
    description:
      "FlowPilot registra el porqué de cada decisión. Siempre sabes qué se decidió, quién lo decidió y por qué se llegó ahí.",
    detail: "Histórico completo. Nunca más '¿por qué lo hicimos así?'",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Features section.
 *
 * Responsive grid:
 * - Mobile: single column, p-6 padding
 * - md+: two columns
 * - lg+: three columns, p-8 padding
 *
 * Cards stagger in with 120ms between each using `staggerContainer` +
 * `staggerItem` variants from `useAnimationVariants`.
 */
export default function Features() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="caracteristicas" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <span className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Características
          </span>
          <h2 className="font-heading font-bold text-slate-900 text-fluid-h2 mt-3 mb-4">
            Tres piezas. Un solo flujo.
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
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

function FeatureCard({ feature }: { feature: Feature }) {
  const { staggerItem } = useAnimationVariants();
  const Icon = feature.icon;

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative rounded-2xl border ${feature.border} ${feature.hoverBorder} p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white`}
    >
      {/* Icon container */}
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 sm:mb-6`}
        aria-hidden="true"
      >
        <Icon size={20} className={feature.color} />
      </div>

      <h3 className="font-heading font-bold text-slate-900 text-fluid-h3 mb-2.5">
        {feature.title}
      </h3>

      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        {feature.description}
      </p>

      <p className={`text-xs font-semibold ${feature.color}`}>
        {feature.detail}
      </p>
    </motion.article>
  );
}
