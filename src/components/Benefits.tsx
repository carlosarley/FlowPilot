"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Data ──────────────────────────────────────────────────────────────────────

interface Metric {
  value: string;
  label: string;
  // Tailwind text color class, includes dark: variant.
  // Accent colors shift one step lighter (600 → 400) in dark mode so they
  // remain above WCAG AA contrast threshold on dark card backgrounds.
  color: string;
}

/*
 * Three headline metrics that quantify FlowPilot's impact.
 *
 * `tabular-nums` (applied in MetricCard) keeps digit characters equal-width
 * so that "3x", "80%", and "100%" align cleanly in their column.
 *
 * Dark: accent text steps from -600 to -400 for readability on slate-800 bg.
 */
const METRICS: Metric[] = [
  { value: "3x",   label: "más rápidas las decisiones de equipo", color: "text-teal-600 dark:text-teal-400" },
  { value: "80%",  label: "menos emails por reunión",             color: "text-orange-600 dark:text-orange-400" },
  { value: "100%", label: "de contexto en cada tarea",            color: "text-violet-600 dark:text-violet-400" },
];

// Four concise value points that reinforce the metrics with concrete benefits.
const VALUE_POINTS = [
  "Todos saben qué está pasando, sin preguntar.",
  "Las ideas buenas dejan de perderse en chats.",
  "Las decisiones tienen historial — y responsable.",
  "El equipo avanza aunque no esté en la misma sala.",
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Benefits
 *
 * Quantified value proposition section. Left column = metric cards;
 * right column = headline, body copy, bullet points, and a text CTA.
 *
 * Layout:
 *   Mobile: single column (metrics first, then copy below)
 *   lg+:    two-column grid — metrics left, copy right
 *
 * Animation:
 *   - fadeLeft slides the metric column in from the left
 *   - fadeRight slides the copy block in from the right
 *   Both trigger on scroll (whileInView), firing once.
 *
 * Dark mode:
 *   Section bg:    slate-50  → slate-900
 *   Card bg:       white     → slate-800
 *   Card border:   slate-100 → slate-700
 *   Body text:     slate-500 → slate-400
 *   List items:    slate-600 → slate-300 (slightly lighter for readability)
 *   Teal accent:   teal-600/700 → teal-400/300
 */
export default function Benefits() {
  const { fadeLeft, fadeRight } = useAnimationVariants();

  return (
    <section id="beneficios" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Metric cards ─────────────────────────────────────────── */}
          {/* fadeLeft: slides from x:-24 → x:0 with easeOut */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {METRICS.map((metric, index) => (
                // index passed to MetricCard to stagger each card's entrance delay
                <MetricCard key={metric.value} metric={metric} index={index} />
              ))}
            </div>
          </motion.div>

          {/* ── Copy block ───────────────────────────────────────────── */}
          {/* fadeRight: slides from x:+24 → x:0 with easeOut */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow label */}
            <span className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Por qué FlowPilot
            </span>

            <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3 mb-5">
              Trabaja con claridad.{" "}
              <span className="text-teal-600 dark:text-teal-400">Avanza con confianza.</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-7">
              No es otra herramienta más. Es el lugar donde el pensamiento del
              equipo se convierte en acción — sin la fricción de coordinar entre
              cinco apps distintas.
            </p>

            {/* Bullet list using custom teal dot instead of browser default list style */}
            <ul className="space-y-3 mb-7" aria-label="Beneficios principales">
              {VALUE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  {/* Teal ring + filled dot — purely decorative, hidden from screen readers */}
                  <span
                    className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Text-only CTA — animates the gap on hover to "pull" the arrow */}
            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 font-semibold text-sm hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
            >
              Quiero probarlo
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

/**
 * MetricCard
 *
 * Horizontal card with a large metric value on the left and a short
 * label on the right. Each card animates independently: x:-16 → x:0
 * with a 100ms delay multiplied by `index` to create a stagger effect.
 *
 * `tabular-nums` on the value span keeps "3x", "80%", "100%" visually
 * aligned in their column even when digit counts differ.
 *
 * `minWidth: "4rem"` on the value prevents label text from shifting
 * horizontally as cards with shorter values (e.g. "3x") load.
 */
function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      // 0.45s duration (reduced from 0.6s) — snappier without feeling rushed
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-center gap-5 sm:gap-6 bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-700 shadow-sm"
    >
      <span
        className={`font-heading text-4xl sm:text-5xl font-bold ${metric.color} leading-none shrink-0 tabular-nums`}
        style={{ minWidth: "4rem" }}
      >
        {metric.value}
      </span>
      <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-snug">
        {metric.label}
      </span>
    </motion.div>
  );
}
