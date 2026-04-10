"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import { AnimatedCounter } from "./AnimatedCounter";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Logo { name: string; initial: string; color: string }
interface Testimonial { quote: string; name: string; role: string; avatar: string; color: string }
interface Stat { value: string; label: string }

// ── Data ──────────────────────────────────────────────────────────────────────

const LOGOS: Logo[] = [
  { name: "Acme Corp",     initial: "AC", color: "bg-slate-700" },
  { name: "Vertex Labs",   initial: "VL", color: "bg-blue-600" },
  { name: "Synapse",       initial: "SY", color: "bg-violet-600" },
  { name: "Polar Studio",  initial: "PS", color: "bg-teal-600" },
  { name: "Meridian",      initial: "ME", color: "bg-orange-600" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Por fin un lugar donde las ideas no se pierden en Slack. Las reuniones de alineación bajaron de 5 a 2 por semana — y las decisiones llegan antes de que el momento pase.",
    name: "Ana Reyes",
    role: "Product Lead · Vertex Labs",
    avatar: "A",
    color: "bg-blue-500",
  },
  {
    quote: "Lo que más me gusta es el historial de decisiones. Antes siempre alguien preguntaba '¿por qué hicimos esto?' Ahora la respuesta está a un clic. Eso solo ya pagó la suscripción.",
    name: "Marco Salas",
    role: "CTO · Synapse",
    avatar: "M",
    color: "bg-violet-500",
  },
  {
    quote: "Migrar a FlowPilot fue lo mejor que hicimos en Q1. El equipo de diseño y el de ingeniería por fin hablan el mismo idioma — y el roadmap ya no vive en cinco Notion distintos.",
    name: "Carla Ibáñez",
    role: "Design Director · Polar Studio",
    avatar: "C",
    color: "bg-teal-500",
  },
];

const STATS: Stat[] = [
  { value: "2,400+", label: "equipos en lista" },
  { value: "18",     label: "países" },
  { value: "4.9/5",  label: "satisfacción" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * SocialProof
 *
 * Design changes vs. the "template" version:
 *
 * Stats:
 *   Removed the teal-50 bordered boxes — those are a dead giveaway of SaaS
 *   template kits. Replaced with an editorial/magazine-style horizontal strip:
 *   three large numbers separated by thin vertical lines, no background.
 *   Much more intentional and typographically bold.
 *
 * Testimonials:
 *   Added a large opening quotation mark (") as a decorative element per card —
 *   gives the cards a magazine/editorial quality. The first card is slightly
 *   taller via `md:row-span-2` to break the uniform grid pattern.
 */
export default function SocialProof() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Company logos ─────────────────────────────────────────── */}
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6 sm:mb-8">
            Equipos que ya confiaron en FlowPilot durante la beta
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
          and uppercase labels. This editorial treatment feels designed, not
          generated from a template. AnimatedCounter still runs on each value.
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0 mb-16 sm:mb-20">
          {STATS.map((stat, i) => (
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
            Testimonios
          </span>
          <h2 className="font-heading font-bold text-slate-900 dark:text-white text-fluid-h2 mt-3">
            Lo que dicen los equipos
          </h2>
        </div>

        {/* ── Testimonial cards ─────────────────────────────────────── */}
        {/*
          Masonry-ish layout: first card gets md:row-span-2 so it's visibly
          taller than its neighbours — breaks the uniform card grid pattern.
          On lg, the layout is 3 columns but the height asymmetry persists.
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} featured={i === 0} />
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
 * @param featured  When true, the card spans 2 rows on md (taller, more prominent).
 *                  Used for the first testimonial to break grid uniformity.
 *
 * Design detail: the large opening quote mark ("") is rendered as a decorative
 * element — serif font, very light teal, positioned at the top of each card.
 * This gives testimonials a magazine/editorial quality that diverges from
 * the standard "5 stars + paragraph + avatar" template card.
 */
function TestimonialCard({
  testimonial,
  featured,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  const { staggerItem } = useAnimationVariants();

  return (
    <motion.blockquote
      variants={staggerItem}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-all duration-300 flex flex-col ${
        // Featured card spans 2 rows on md — taller than neighbours
        featured ? "md:row-span-2" : ""
      }`}
    >
      {/* Large decorative opening quote — editorial treatment */}
      <div
        className="font-serif text-6xl text-teal-200 dark:text-teal-800 leading-none mb-2 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* 5-star rating */}
      <div className="flex gap-0.5 mb-4" aria-label="5 estrellas de 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote — grow pushes author to bottom */}
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
