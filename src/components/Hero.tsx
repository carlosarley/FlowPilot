"use client";

import { motion } from "framer-motion";
import MockupUI from "./MockupUI";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { Lightbulb, CheckSquare, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SOCIAL_AVATARS = [
  { initial: "A", color: "bg-teal-500" },
  { initial: "M", color: "bg-violet-500" },
  { initial: "C", color: "bg-orange-500" },
  { initial: "L", color: "bg-blue-500" },
];

// Icons are non-translatable — pairing by index with t.hero.pills
const PILL_ICONS = [Lightbulb, CheckSquare, BookOpen];
const PILL_STYLES = [
  { bg: "bg-violet-50 dark:bg-violet-900/30 border-violet-100 dark:border-violet-800", text: "text-violet-600 dark:text-violet-400" },
  { bg: "bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-800",         text: "text-teal-600 dark:text-teal-400"   },
  { bg: "bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800", text: "text-orange-600 dark:text-orange-400" },
];

/**
 * Hero
 *
 * Design decisions that break the template feel:
 * 1. Dot grid background (radial-gradient) replaces generic blobs
 * 2. Gradient text on the H1 accent span (.text-gradient-teal)
 * 3. MockupUI floats with a teal glow shadow and a 1° rotation
 * 4. The headline breaks deliberately at the comma
 *
 * i18n: all copy comes from t.hero via useLanguage().
 */
export default function Hero() {
  const { fadeUp, heroMockup } = useAnimationVariants();
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center pt-16 overflow-hidden bg-white dark:bg-slate-950 min-h-screen">

      {/* Dot grid background — fades toward center via radial mask */}
      <div
        className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-60 dark:opacity-20"
        style={{ WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, black 100%)" }}
        aria-hidden="true"
      />

      {/* Accent blobs — subtle tint, not a shape */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/8 dark:bg-teal-400/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-400/8 dark:bg-orange-400/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left column: copy ──────────────────────────────────────── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-start">

          {/* Early-access badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" aria-hidden="true" />
            {t.hero.badge}
          </div>

          {/*
            H1 — two visual beats:
              t.hero.h1       → slate-900 / white
              t.hero.h1Accent → gradient teal-to-cyan via .text-gradient-teal
          */}
          <h1 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-hero mb-5 max-w-xl">
            {t.hero.h1}
            <span className="text-gradient-teal">{t.hero.h1Accent}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
            {t.hero.subtitle}
          </p>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#cta"
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900/40 active:scale-[0.98] text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 w-full sm:w-auto"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#caracteristicas"
              className="inline-flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 font-semibold px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 w-full sm:w-auto"
            >
              {t.hero.ctaSecondary}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Social-proof nudge */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 w-full">
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
              <span className="font-semibold text-slate-700 dark:text-slate-200">{t.hero.socialBold}</span>
              {t.hero.socialRest}
            </p>
          </div>
        </motion.div>

        {/* ── Right column: product mockup (desktop only) ───────────── */}
        <motion.div
          variants={heroMockup}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex justify-end"
        >
          {/*
            Floating mockup: teal ambient glow via blur + 1° tilt for depth.
            hover:rotate-0 removes the tilt on hover — feels interactive.
          */}
          <div className="relative">
            <div
              className="absolute -inset-8 bg-teal-400/15 dark:bg-teal-500/8 rounded-3xl blur-3xl"
              aria-hidden="true"
            />
            <div className="relative rotate-1 hover:rotate-0 transition-transform duration-500">
              <MockupUI />
            </div>
          </div>
        </motion.div>

        {/* ── Mobile feature pills (< lg) ───────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3"
          aria-hidden="true"
        >
          {t.hero.pills.map((label, i) => {
            const Icon = PILL_ICONS[i];
            const style = PILL_STYLES[i];
            return (
              <div key={label} className={`${style.bg} border rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 text-center`}>
                <Icon size={20} className={style.text} />
                <span className={`text-xs sm:text-sm font-semibold ${style.text}`}>{label}</span>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
