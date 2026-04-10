import { Zap } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

/*
 * Footer navigation organised into three groups: Product, Company, Support.
 * All hrefs currently point to "#" — replace with real routes before launch.
 * Using a Record<string, string[]> keeps the data structure flat and easy to
 * update without touching the render logic.
 */
const FOOTER_LINKS: Record<string, string[]> = {
  Producto: ["Características", "Precios", "Roadmap", "Changelog"],
  Empresa:  ["Sobre nosotros", "Blog", "Carreras", "Prensa"],
  Soporte:  ["Documentación", "Guías", "Contacto", "Estado del servicio"],
};

// Social platform handles — `short` is the abbreviated label shown in the button.
// `label` provides the full platform name for the aria-label on the anchor.
const SOCIAL_HANDLES = [
  { label: "X (Twitter)", short: "X" },
  { label: "LinkedIn",    short: "in" },
  { label: "GitHub",      short: "gh" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Footer
 *
 * Site-wide footer with brand, social links, and three link groups.
 *
 * Layout:
 *   Mobile:  2 columns (brand spans full width at top, links fill below)
 *   sm:      2 columns
 *   md+:     4 columns — brand takes col 1, each link group takes one col
 *
 * Dark mode:
 *   Light: bg-slate-950 (already very dark — unchanged in dark mode but shifted
 *   to slate-900 so it appears slightly lighter than the slate-950 body, creating
 *   a subtle section boundary at the bottom of the page).
 *   Text colors are already muted (slate-400/500/600), so they need no change —
 *   they read well on both slate-950 and slate-900 backgrounds.
 *
 * Safe-area:
 *   `pb-safe` on the bottom bar uses `max(1.5rem, env(safe-area-inset-bottom))`
 *   so the copyright line never sits behind the iPhone home indicator bar.
 *
 * Attribution:
 *   The "Built with Claude Web Builder by Tododeia" line is a required credit.
 *   It is styled subtly (text-slate-600) to not distract from the brand content.
 */
export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">

        {/* ── Link grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">

          {/* Brand column — spans 2 cols on mobile/sm, 1 col on md+ */}
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
            {/* Tagline — max-width keeps line length comfortable */}
            <p className="text-sm leading-relaxed text-slate-500 max-w-[200px]">
              Del caos al flujo, en un solo lugar.
            </p>

            {/* Social buttons — 40×40px, above the 44px WCAG guideline with gap area */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_HANDLES.map(({ label, short }) => (
                <a
                  key={short}
                  href="#" // TODO: replace with real profile URLs before launch
                  aria-label={`FlowPilot en ${label}`}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link sections — rendered from the FOOTER_LINKS record */}
          {Object.entries(FOOTER_LINKS).map(([section, items]) => (
            // <nav> + aria-label makes each group a named navigation landmark
            <nav key={section} aria-label={`${section} links`}>
              <h3 className="text-white text-sm font-semibold mb-4">{section}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      // teal-400 on hover — consistent with the rest of the site's hover palette
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
        {/* border-t provides a thin separator between the link grid and legal line */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 pb-safe">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © 2025 FlowPilot. Todos los derechos reservados.
          </p>
          {/* Required attribution — subtle but always present */}
          <p className="text-xs text-slate-600">
            Built with Claude Web Builder by{" "}
            <a
              href="https://tododeia.com"
              className="text-slate-500 hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
              target="_blank"
              rel="noopener noreferrer" // prevents window.opener exploit on external links
            >
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
