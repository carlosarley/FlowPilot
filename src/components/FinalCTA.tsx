"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

/**
 * FinalCTA
 *
 * The last conversion section before the footer. A dark background creates
 * strong visual contrast that signals "this is the close" after a series of
 * lighter sections above.
 *
 * Dark mode:
 *   In light mode the section uses slate-900, which stands out from the
 *   white/slate-50 sections above. In dark mode (body = slate-950), we
 *   shift to slate-800 so there's still visible contrast against the page.
 *   The decorative blobs increase opacity slightly (10% → 15%) so they're
 *   more visible against the darker baseline.
 *
 * Form note:
 *   The <form> is a prototype-only UI — `onSubmit` is prevented.
 *   Before production: wire to a real provider (Resend, Loops, Mailchimp)
 *   and add server-side email validation + duplicate-submission protection.
 *
 * Accessibility:
 *   - `<label htmlFor="cta-email">` is present but visually hidden (sr-only)
 *     so screen readers announce the input purpose without breaking the design.
 *   - The submit button has a clear text label ("Solicitar acceso") — no icon-only.
 */
export default function FinalCTA() {
  const { fadeUp } = useAnimationVariants();

  return (
    <section id="cta" className="py-16 sm:py-24 bg-slate-900 dark:bg-slate-800 relative overflow-hidden">

      {/* Decorative background — purely visual, hidden from assistive tech */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Teal glow above center — draws attention toward the headline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-600/10 dark:bg-teal-600/15 rounded-full blur-3xl" />
        {/* Orange glow bottom-right — adds warmth and visual tension */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-600/10 dark:bg-orange-600/15 rounded-full blur-3xl" />
        {/* Subtle dot-grid texture at near-zero opacity for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Single motion wrapper — all content fades up together as a unit */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand icon — teal glow badge reiterates product identity at the close */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-teal-600/20 border border-teal-500/30 rounded-2xl mb-5 sm:mb-6"
            aria-hidden="true"
          >
            <Zap size={22} className="text-teal-400 fill-teal-400" />
          </div>

          {/* Closing headline — fluid type (clamp 28→40px) prevents overflow on mobile */}
          <h2 className="font-heading font-bold text-white text-fluid-h2 sm:text-5xl leading-tight mb-4">
            Tu equipo merece{" "}
            {/* Teal accent completes the sentence with an emotional payoff */}
            <span className="text-teal-400">trabajar mejor.</span>
          </h2>

          {/* Supporting copy — reinforces the zero-friction message */}
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8 max-w-xl mx-auto">
            Forma parte del acceso anticipado. Sin costo, sin tarjeta de crédito.
            Solo un equipo listo para dejar el caos atrás.
          </p>

          {/* ── Email signup form ─────────────────────────────────────── */}
          {/* TODO: replace e.preventDefault() with a real API call before launch */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4 sm:mb-6"
            aria-label="Formulario de acceso anticipado"
          >
            {/* Visually hidden label — required for accessibility even with a placeholder */}
            <label htmlFor="cta-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="cta-email"
              type="email"
              placeholder="tu@empresa.com"
              autoComplete="email" // enables browser autofill for the email field
              // bg-white/10 = glass effect on the dark section background
              className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-slate-500 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-transparent transition-all"
            />
            <button
              type="submit"
              // Orange CTA — high-energy color signals the primary action
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 sm:px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-900/30 active:scale-[0.98] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Solicitar acceso
            </button>
          </form>

          {/* Reassurance line — addresses the most common sign-up objections */}
          <p className="text-slate-500 text-xs sm:text-sm">
            Sin spam. Sin compromisos. Cancelable en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
