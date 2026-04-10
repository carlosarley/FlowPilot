import { Zap } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const FOOTER_LINKS: Record<string, string[]> = {
  Producto: ["Características", "Precios", "Roadmap", "Changelog"],
  Empresa:  ["Sobre nosotros", "Blog", "Carreras", "Prensa"],
  Soporte:  ["Documentación", "Guías", "Contacto", "Estado del servicio"],
};

const SOCIAL_HANDLES = [
  { label: "X (Twitter)", short: "X" },
  { label: "LinkedIn",    short: "in" },
  { label: "GitHub",      short: "gh" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Site-wide footer.
 *
 * Responsive grid:
 * - Mobile: single column — brand, then each link section stacked
 * - sm: two columns
 * - md+: four columns (brand + three link groups)
 *
 * Dark mode: the footer uses slate-900 (slightly lighter than body slate-950)
 * so it has subtle separation from the FinalCTA section above.
 * Safe-area padding applied to the bottom bar for iPhones with a home bar.
 */
export default function Footer() {
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
              Del caos al flujo, en un solo lugar.
            </p>
            {/* Social handles — 44×44px touch targets */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_HANDLES.map(({ label, short }) => (
                <a
                  key={short}
                  href="#"
                  aria-label={`FlowPilot en ${label}`}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(FOOTER_LINKS).map(([section, items]) => (
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
            © 2025 FlowPilot. Todos los derechos reservados.
          </p>
          {/* Required attribution */}
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
