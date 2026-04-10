"use client";

import { Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Social platform handles — brand names don't change with language
const SOCIAL_HANDLES = [
  { label: "X (Twitter)", short: "X" },
  { label: "LinkedIn",    short: "in" },
  { label: "GitHub",      short: "gh" },
];

/**
 * Footer
 *
 * Site-wide footer with brand, social links, and three link groups.
 *
 * i18n: section names and link labels come from t.footer.sections which
 * maps to translated keys ("Product"/"Company"/"Support" in EN,
 * "Producto"/"Empresa"/"Soporte" in ES). The tagline and copyright also switch.
 *
 * Note: Footer needs "use client" because it calls useLanguage().
 */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 dark:bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">

        {/* ── Link grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"
                aria-hidden="true"
              >
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-heading font-bold text-white text-lg">
                FlowPilot
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-[200px]">
              {t.footer.tagline}
            </p>

            {/* Social buttons */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_HANDLES.map(({ label, short }) => (
                <a
                  key={short}
                  href="#"
                  aria-label={`${t.footer.socialLabel} ${label}`}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link sections — from translated t.footer.sections record */}
          {Object.entries(t.footer.sections).map(([section, items]) => (
            <nav key={section} aria-label={`${section} links`}>
              <h3 className="text-white text-sm font-semibold mb-4">{section}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 pb-safe">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            {t.footer.copyright}
          </p>
          <p className="text-xs text-slate-600">
            Built with Claude Web Builder by{" "}
            <a
              href="https://tododeia.com"
              className="text-slate-500 hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
