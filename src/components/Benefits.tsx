"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { AnimatedCounter } from "./AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Benefits
 *
 * Quantified value proposition section.
 * Left column = animated metric cards; right column = headline + copy + CTA.
 *
 * Layout:
 *   Mobile: single column (metrics first, copy below)
 *   lg+:    two-column grid — metrics left, copy right
 *
 * i18n: all copy and metric data come from t.benefits via useLanguage().
 */
export default function Benefits() {
  const { fadeLeft, fadeRight } = useAnimationVariants();
  const { t } = useLanguage();

  return (
    <section id="beneficios" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Metric cards ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {t.benefits.metrics.map((metric, index) => (
                <MetricCard key={metric.value} metric={metric} index={index} />
              ))}
            </div>
          </motion.div>

          {/* ── Copy block ───────────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              {t.benefits.label}
            </span>

            <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3 mb-5">
              {t.benefits.heading}
              <span className="text-teal-600 dark:text-teal-400">{t.benefits.headingAccent}</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-7">
              {t.benefits.body}
            </p>

            {/* Bullet list — teal ring + dot instead of browser list style */}
            <ul className="space-y-3 mb-7" aria-label={t.benefits.label}>
              {t.benefits.points.map((point) => (
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

            {/* Text-only CTA — gap animates on hover to "pull" the arrow */}
            <a
              href="#cta"
              className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 font-semibold text-sm hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
            >
              {t.benefits.cta}
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
 * Horizontal card: large metric value left, short label right.
 * Stagger delay = index × 100ms for a cascading entrance.
 * `tabular-nums` keeps "3x", "80%", "100%" visually aligned.
 */
function MetricCard({
  metric,
  index,
}: {
  metric: { value: string; label: string; color: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="flex items-center gap-5 sm:gap-6 bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-700 shadow-sm"
    >
      <AnimatedCounter
        value={metric.value}
        className={`font-heading text-4xl sm:text-5xl font-bold ${metric.color} leading-none shrink-0 tabular-nums`}
        duration={1.6}
      />
      <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-snug">
        {metric.label}
      </span>
    </motion.div>
  );
}
