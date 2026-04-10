"use client";

import { motion } from "framer-motion";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Structural data (non-translatable) ────────────────────────────────────────
//
// Icon, color, and layout properties stay in the component — only copy lives
// in translations. The arrays align by index with t.features.items.

interface FeatureStyle {
  icon: LucideIcon;
  number: string;   // decorative background number: "01", "02", "03"
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
}

const FEATURE_STYLES: FeatureStyle[] = [
  {
    icon: Lightbulb,
    number: "01",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
    border: "border-violet-100 dark:border-violet-800",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
  },
  {
    icon: CheckSquare,
    number: "02",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/30",
    border: "border-teal-100 dark:border-teal-800",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
  },
  {
    icon: BookOpen,
    number: "03",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/30",
    border: "border-orange-100 dark:border-orange-800",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
  },
];

// Grid layout config per card — index-aligned with FEATURE_STYLES
const CARD_LAYOUTS = [
  { spanClass: "md:col-span-2 lg:col-span-2", horizontal: true  },
  { spanClass: "md:col-span-1 lg:col-span-1", horizontal: false },
  { spanClass: "md:col-span-2 lg:col-span-3", horizontal: true  },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Features
 *
 * Bento asymmetric grid:
 *   lg: [Card 0 — 2 cols wide] [Card 1 — 1 col]
 *       [Card 2 — 3 cols full width]
 *   md: [Card 0 — full width] [Card 1] [Card 2]
 *
 * Each card has a large decorative background number (01/02/03) at near-zero
 * opacity — texture rather than content.
 *
 * i18n: copy comes from t.features via useLanguage().
 */
export default function Features() {
  const { staggerContainer } = useAnimationVariants();
  const { t } = useLanguage();

  return (
    <section id="caracteristicas" className="py-16 sm:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">

      {/* Dot grid — differentiates this section from adjacent white sections */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-[0.07] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header — left-aligned for intentional asymmetry */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <span className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            {t.features.label}
          </span>
          <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3 mb-4">
            {t.features.heading}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.features.body}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURE_STYLES.map((style, i) => (
            <FeatureCard
              key={style.number}
              style={style}
              text={t.features.items[i]}
              spanClass={CARD_LAYOUTS[i].spanClass}
              horizontal={CARD_LAYOUTS[i].horizontal}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function FeatureCard({
  style,
  text,
  spanClass = "",
  horizontal = false,
}: {
  style: FeatureStyle;
  text: { title: string; description: string; detail: string };
  spanClass?: string;
  horizontal?: boolean;
}) {
  const { staggerItem } = useAnimationVariants();
  const Icon = style.icon;

  return (
    <motion.article
      variants={staggerItem}
      className={`group relative rounded-2xl border ${style.border} ${style.hoverBorder} ${spanClass} bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-300 hover:-translate-y-0.5`}
    >
      {/* Decorative background number — absolute, bottom-right, near-zero opacity */}
      <span
        className={`absolute -bottom-4 -right-2 text-[8rem] font-heading font-bold leading-none select-none pointer-events-none ${style.color} opacity-[0.06] dark:opacity-[0.08] tabular-nums`}
        aria-hidden="true"
      >
        {style.number}
      </span>

      {/* Card content — horizontal on md+ for wide cards, vertical otherwise */}
      <div className={`relative p-6 lg:p-8 h-full ${horizontal ? "md:flex md:items-start md:gap-8" : "flex flex-col"}`}>

        {/* Icon container */}
        <div
          className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center shrink-0 ${horizontal ? "mb-5 md:mb-0" : "mb-5"}`}
          aria-hidden="true"
        >
          <Icon size={22} className={style.color} />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h3 mb-2.5">
            {text.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            {text.description}
          </p>
          <p className={`text-xs font-semibold ${style.color}`}>
            {text.detail}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
