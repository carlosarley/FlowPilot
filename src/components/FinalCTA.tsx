"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

/**
 * Final call-to-action section — the last stop before the footer.
 *
 * Dark background creates visual contrast that signals "this is the close."
 * In dark mode, the section uses a slightly lighter shade (slate-800) so it
 * stands out from the slate-950 body background.
 *
 * Responsive behavior:
 * - Email + button: flex-col on mobile, flex-row on sm+
 * - Headline uses fluid type to avoid overflow on small screens
 *
 * Note: The form is a prototype-only UI. Before production, wire the submit
 * handler to a real email provider (Resend, Loops, Mailchimp, etc.) and
 * add server-side validation.
 */
export default function FinalCTA() {
  const { fadeUp } = useAnimationVariants();

  return (
    <section id="cta" className="py-16 sm:py-24 bg-slate-900 dark:bg-slate-800 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-600/10 dark:bg-teal-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-600/10 dark:bg-orange-600/15 rounded-full blur-3xl" />
        {/* Subtle grid texture */}
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand icon */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-teal-600/20 border border-teal-500/30 rounded-2xl mb-5 sm:mb-6"
            aria-hidden="true"
          >
            <Zap size={22} className="text-teal-400 fill-teal-400" />
          </div>

          {/* Closing headline — fluid type prevents overflow on mobile */}
          <h2 className="font-heading font-bold text-white text-fluid-h2 sm:text-5xl leading-tight mb-4">
            Tu equipo merece{" "}
            <span className="text-teal-400">trabajar mejor.</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8 max-w-xl mx-auto">
            Forma parte del acceso anticipado. Sin costo, sin tarjeta de crédito.
            Solo un equipo listo para dejar el caos atrás.
          </p>

          {/* Email signup — TODO: wire to real provider before launch */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4 sm:mb-6"
            aria-label="Formulario de acceso anticipado"
          >
            <label htmlFor="cta-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="cta-email"
              type="email"
              placeholder="tu@empresa.com"
              autoComplete="email"
              className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-slate-500 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-transparent transition-all"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 sm:px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-900/30 active:scale-[0.98] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Solicitar acceso
            </button>
          </form>

          <p className="text-slate-500 text-xs sm:text-sm">
            Sin spam. Sin compromisos. Cancelable en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
