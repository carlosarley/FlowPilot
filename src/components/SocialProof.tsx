"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { AnimatedCounter } from "./AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Non-translatable structural data ─────────────────────────────────────────

interface Logo { name: string; initial: string; color: string }

// Company logos — brand names and colors don't change with language
const LOGOS: Logo[] = [
  { name: "Acme Corp",     initial: "AC", color: "bg-slate-700" },
  { name: "Vertex Labs",   initial: "VL", color: "bg-blue-600" },
  { name: "Synapse",       initial: "SY", color: "bg-violet-600" },
  { name: "Polar Studio",  initial: "PS", color: "bg-teal-600" },
  { name: "Meridian",      initial: "ME", color: "bg-orange-600" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * SocialProof
 *
 * Design treatments that break the template feel:
 *
 * Stats:
 *   Editorial horizontal strip — large numbers + thin vertical dividers,
 *   no background boxes. Intentional and typographically bold.
 *
 * Testimonials:
 *   All cards have equal height (no md:row-span-2) — uniform masonry grid.
 *   Large opening quote mark on each card gives editorial/magazine quality.
 *
 * i18n: copy and testimonial text come from t.socialProof via useLanguage().
 */
export default function SocialProof() {
  const { staggerContainer } = useAnimationVariants();
  const { t } = useLanguage();

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Company logos ─────────────────────────────────────────── */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6 sm:mb-8">
            {t.socialProof.logosLabel}
          </p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {LOGOS.map((logo) => (
              <LogoChip key={logo.name} logo={logo} />
            ))}
          </motion.div>
        </div>

        {/* ── Stats — editorial horizontal strip ────────────────────── */}
        {/*
          No boxes, no backgrounds. Just large numbers, thin vertical dividers,
          and uppercase labels. AnimatedCounter counts up on scroll.
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0 mb-16 sm:mb-20">
          {t.socialProof.stats.map((stat, i) => (
            <div key={stat.value} className="flex items-center">
              {/* Vertical divider — hidden on mobile (stats stack vertically) */}
              {i > 0 && (
                <div className="hidden sm:block w-px h-14 bg-slate-200 dark:bg-slate-700 mx-12 lg:mx-16 shrink-0" />
              )}
              <div className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tabular-nums leading-none"
                  duration={1.8}
                />
                <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Testimonials header ───────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            {t.socialProof.statsLabel}
          </span>
          <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3">
            {t.socialProof.testimonialsHeading}
          </h2>
        </div>

        {/* ── Testimonial cards ─────────────────────────────────────── */}
        {/*
          3-column grid on lg, 2-column on md, 1-column on mobile.
          All cards have equal height — no row-span asymmetry —
          so the grid feels intentional rather than random.
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t.socialProof.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function LogoChip({ logo }: { logo: Logo }) {
  const { staggerItem } = useAnimationVariants();
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all"
    >
      <div
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md ${logo.color} flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold shrink-0`}
        aria-hidden="true"
      >
        {logo.initial}
      </div>
      <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold whitespace-nowrap">
        {logo.name}
      </span>
    </motion.div>
  );
}

/**
 * TestimonialCard
 *
 * All cards render at equal height — `flex flex-col` + `grow` on the quote
 * pushes the author footer to the bottom regardless of quote length.
 *
 * The large opening quote mark (&ldquo;) is a decorative editorial element
 * rendered at the top of each card.
 */
function TestimonialCard({
  testimonial,
}: {
  testimonial: { quote: string; name: string; role: string; avatar: string; color: string };
}) {
  const { staggerItem } = useAnimationVariants();

  return (
    <motion.blockquote
      variants={staggerItem}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-all duration-300 flex flex-col"
    >
      {/* Large decorative opening quote — editorial treatment */}
      <div
        className="font-serif text-6xl text-teal-200 dark:text-teal-800 leading-none mb-2 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* 5-star rating */}
      <div className="flex gap-0.5 mb-4" aria-label="5 stars out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote — grow pushes author to bottom, keeping all cards equal height */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 grow">
        {testimonial.quote}
      </p>

      {/* Author */}
      <footer className="flex items-center gap-3 mt-auto">
        <div
          className={`w-9 h-9 rounded-full ${testimonial.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>
        <div>
          <cite className="text-sm font-semibold text-slate-800 dark:text-slate-100 not-italic block">
            {testimonial.name}
          </cite>
          <p className="text-xs text-slate-400 dark:text-slate-500">{testimonial.role}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}
