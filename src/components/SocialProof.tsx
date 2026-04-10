"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

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
 * Social Proof section — logos, stats, and testimonials.
 *
 * Stats grid is INTENTIONALLY responsive:
 * - Mobile: single column (stat + label stacked, full-width cards)
 * - sm+: three columns
 *
 * On a 375px screen, three 4+ character values + two-line labels inside tiny
 * columns look broken. Single column at mobile gives each stat room to breathe.
 */
export default function SocialProof() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Company logos ────────────────────────────────────────── */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6 sm:mb-8">
            Equipos que ya confiaron en FlowPilot durante la beta
          </p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6"
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

        {/* ── Stats grid ───────────────────────────────────────────── */}
        {/*
          Mobile: 1 column — each stat gets full width so text never wraps.
          sm+: 3 columns — fits comfortably once the viewport is wide enough.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-1 py-5 sm:py-8 px-6 sm:px-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-100 dark:border-teal-800"
            >
              <div className="font-heading text-3xl sm:text-4xl font-bold text-teal-700 dark:text-teal-400 tabular-nums leading-none">
                {stat.value}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-center">{stat.label}</div>
            </motion.div>
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
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
      className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { staggerItem } = useAnimationVariants();

  return (
    <motion.blockquote
      variants={staggerItem}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow flex flex-col"
    >
      {/* 5-star rating */}
      <div className="flex gap-0.5 mb-4" aria-label="5 estrellas de 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 italic grow">
        &ldquo;{testimonial.quote}&rdquo;
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
