"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Data ──────────────────────────────────────────────────────────────────────

interface Metric {
  value: string;
  label: string;
  color: string;
}

const METRICS: Metric[] = [
  { value: "3x",   label: "más rápidas las decisiones de equipo", color: "text-teal-600 dark:text-teal-400" },
  { value: "80%",  label: "menos emails por reunión",             color: "text-orange-600 dark:text-orange-400" },
  { value: "100%", label: "de contexto en cada tarea",            color: "text-violet-600 dark:text-violet-400" },
];

const VALUE_POINTS = [
  "Todos saben qué está pasando, sin preguntar.",
  "Las ideas buenas dejan de perderse en chats.",
  "Las decisiones tienen historial — y responsable.",
  "El equipo avanza aunque no esté en la misma sala.",
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Benefits / Value Proposition section.
 *
 * Responsive layout:
 * - Mobile: single column — metrics stacked, then copy below.
 * - lg+: two-column — metrics left, copy right.
 *
 * Metric values use `tabular-nums` to keep characters aligned,
 * and `text-fluid-h2` for smooth scaling on all screen sizes.
 */
export default function Benefits() {
  const { fadeLeft, fadeRight } = useAnimationVariants();

  return (
    <section id="beneficios" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Metric cards ───────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {METRICS.map((metric, index) => (
                <MetricCard key={metric.value} metric={metric} index={index} />
              ))}
            </div>
          </motion.div>

          {/* ── Copy block ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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

            <ul className="space-y-3 mb-7" aria-label="Beneficios principales">
              {VALUE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
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

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-center gap-5 sm:gap-6 bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-700 shadow-sm"
    >
      {/* Large metric — tabular-nums keeps digits aligned across all values */}
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
