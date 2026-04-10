"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Logo { name: string; initial: string; color: string }
interface Testimonial { quote: string; name: string; role: string; avatar: string; color: string }
interface Stat { value: string; label: string }

// ── Data ──────────────────────────────────────────────────────────────────────

// Five fictional beta companies — initials + brand color for the logo chip.
const LOGOS: Logo[] = [
  { name: "Acme Corp",     initial: "AC", color: "bg-slate-700" },
  { name: "Vertex Labs",   initial: "VL", color: "bg-blue-600" },
  { name: "Synapse",       initial: "SY", color: "bg-violet-600" },
  { name: "Polar Studio",  initial: "PS", color: "bg-teal-600" },
  { name: "Meridian",      initial: "ME", color: "bg-orange-600" },
];

/*
 * Testimonials — each includes a specific, measurable outcome to make the
 * quote credible. Generic praise ("great tool!") is avoided intentionally.
 * Avatar letter + color matches the person's name initial and company color.
 */
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

/*
 * Three social-proof metrics.
 * "tabular-nums" is applied on the value div to keep digit characters
 * equal-width — prevents slight horizontal shifts when numbers are
 * rendered at large display sizes.
 */
const STATS: Stat[] = [
  { value: "2,400+", label: "equipos en lista" },
  { value: "18",     label: "países" },
  { value: "4.9/5",  label: "satisfacción" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * SocialProof
 *
 * Three-part section:
 *   1. Logo strip  — "Trusted by" brand logos with stagger entrance
 *   2. Stats grid  — three key numbers with staggered fade-up
 *   3. Testimonials — three quote cards with stagger entrance
 *
 * Stats grid responsive note:
 *   On 375px mobile, three columns with "2,400+" and two-line labels look
 *   broken. Single column gives each stat room to breathe. sm+ switches to
 *   three columns where there's enough space.
 *
 * Dark mode:
 *   Section bg:     white     → slate-950
 *   Logo chips:     slate-50  → slate-900 bg, slate-100 → slate-800 border
 *   Stats tiles:    teal-50   → teal-900/20, teal-100 border → teal-800
 *   Stat value:     teal-700  → teal-400
 *   Quote cards:    white     → slate-900 bg, slate-100 → slate-800 border
 */
export default function SocialProof() {
  const { staggerContainer } = useAnimationVariants();

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Company logos ─────────────────────────────────────────── */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Section tag — uppercase, muted, very wide tracking */}
          <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6 sm:mb-8">
            Equipos que ya confiaron en FlowPilot durante la beta
          </p>
          {/* Logo chips animate in with stagger — staggerContainer defines the delay */}
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

        {/* ── Stats grid ────────────────────────────────────────────── */}
        {/*
          Mobile: 1 column — each stat gets full width so text never wraps.
          sm+: 3 columns — fits comfortably once the viewport is wide enough.
          flex items-center on mobile = value and label side-by-side (not stacked).
          sm:flex-col = stack vertically in wider columns.
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
              {/* tabular-nums keeps digit widths consistent */}
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

/**
 * LogoChip
 *
 * A pill-shaped chip displaying a colored monogram and company name.
 * Uses `staggerItem` so each chip enters with a sequential delay
 * when the parent `staggerContainer` fires.
 *
 * Dark mode: chip bg white/slate-50 → slate-900, border slate-100 → slate-800.
 */
function LogoChip({ logo }: { logo: Logo }) {
  const { staggerItem } = useAnimationVariants();
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
    >
      {/* Colored monogram — purely decorative, hidden from screen readers */}
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
 * Standard testimonial layout: stars → quote → author footer.
 *
 * Uses `<blockquote>` + `<cite>` for correct semantic HTML (screen readers
 * announce these as a blockquote with an author citation).
 *
 * HTML entities `&ldquo;` / `&rdquo;` are used instead of straight quotes
 * to render typographically correct curly quotation marks.
 *
 * Dark mode: card bg white → slate-900, body text slate-600 → slate-300,
 * author slate-800 → slate-100 so it stands out from the quote.
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { staggerItem } = useAnimationVariants();

  return (
    <motion.blockquote
      variants={staggerItem}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow flex flex-col"
    >
      {/* 5 filled amber stars — aria-label announces the rating to screen readers */}
      <div className="flex gap-0.5 mb-4" aria-label="5 estrellas de 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote text — `grow` pushes the author footer to the bottom of the card */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 italic grow">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author section — at the bottom thanks to `mt-auto` from flex + grow above */}
      <footer className="flex items-center gap-3 mt-auto">
        <div
          className={`w-9 h-9 rounded-full ${testimonial.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>
        <div>
          {/* <cite> = semantic author attribution; not-italic overrides browser default */}
          <cite className="text-sm font-semibold text-slate-800 dark:text-slate-100 not-italic block">
            {testimonial.name}
          </cite>
          <p className="text-xs text-slate-400 dark:text-slate-500">{testimonial.role}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}
