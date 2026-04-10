import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

// ── Font configuration ────────────────────────────────────────────────────────
// Both fonts use `display: swap` to prevent invisible text during load (FOIT).
// The `variable` option exposes each font as a CSS custom property:
//   --font-outfit    → consumed as `--font-heading` in @theme inline
//   --font-jakarta   → consumed as `--font-sans` in @theme inline
// `adjustFontFallback: true` generates a fallback @font-face whose metrics
// closely match the real font, minimising Cumulative Layout Shift (CLS).

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  // Adjust fallback metrics to minimize Cumulative Layout Shift
  adjustFontFallback: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

// ── Viewport ──────────────────────────────────────────────────────────────────
// `viewportFit: "cover"` makes the page extend into iOS notch / Dynamic Island
// and behind the home bar — paired with `env(safe-area-inset-*)` padding in CSS
// so content is never obscured.
// User scaling is intentionally left enabled — disabling it breaks WCAG 1.4.4.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0D9488",
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "FlowPilot — Del caos al flujo, en un solo lugar",
  description:
    "FlowPilot reúne las ideas, tareas y decisiones de tu equipo en un espacio compartido. Menos ruido. Más avance.",
  openGraph: {
    title: "FlowPilot — Del caos al flujo, en un solo lugar",
    description:
      "FlowPilot reúne las ideas, tareas y decisiones de tu equipo en un espacio compartido.",
    type: "website",
  },
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: next-themes injects `class="dark"` on <html>
    // client-side after hydration. Without this flag React would log a warning
    // about attribute mismatches between SSR and CSR — this suppresses it safely
    // because the difference is intentional and only affects the theme class.
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
