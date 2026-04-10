import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// ── Font configuration ────────────────────────────────────────────────────────
// Both fonts use `display: swap` to prevent invisible text during load.
// `variable` exposes each font as a CSS custom property consumed in globals.css.

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
// viewport-fit=cover ensures the layout extends under the iOS notch / home bar.
// Never disable user scaling — it breaks accessibility.
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
    // suppressHydrationWarning prevents React from warning about the
    // class mismatch caused by next-themes injecting "dark" on the client.
    <html
      lang="es"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
