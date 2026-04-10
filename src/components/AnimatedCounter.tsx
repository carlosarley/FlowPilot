"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  // The display string as it appears in the data — e.g. "2,400+", "4.9/5", "80%", "3x"
  value: string;
  className?: string;
  // Animation duration in seconds (default 1.8s — long enough to be satisfying,
  // short enough not to feel sluggish).
  duration?: number;
}

// ── Parser ────────────────────────────────────────────────────────────────────

interface Parsed {
  target: number;   // numeric value to count up to
  prefix: string;   // anything before the number (usually empty)
  suffix: string;   // anything after the number: "+", "/5", "%", "x", etc.
  decimals: number; // decimal places to preserve — 0 for integers, 1 for "4.9"
  hasCommas: boolean; // whether to re-insert thousand separators on display
}

/**
 * Parses a display string into its numeric and non-numeric parts.
 *
 * Examples:
 *   "2,400+"  → { target: 2400, suffix: "+",  decimals: 0, hasCommas: true  }
 *   "4.9/5"   → { target: 4.9,  suffix: "/5", decimals: 1, hasCommas: false }
 *   "80%"     → { target: 80,   suffix: "%",  decimals: 0, hasCommas: false }
 *   "3x"      → { target: 3,    suffix: "x",  decimals: 0, hasCommas: false }
 *   "18"      → { target: 18,   suffix: "",   decimals: 0, hasCommas: false }
 */
function parse(raw: string): Parsed {
  const hasCommas = raw.includes(",");
  // Strip commas so "2,400" becomes "2400" for parseFloat
  const noCommas = raw.replace(/,/g, "");

  // Regex: optional non-digit prefix, a number (int or decimal), then any suffix
  const m = noCommas.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) {
    return { target: 0, prefix: "", suffix: raw, decimals: 0, hasCommas: false };
  }

  const [, prefix, numStr, suffix] = m;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return { target: parseFloat(numStr), prefix, suffix, decimals, hasCommas };
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AnimatedCounter
 *
 * Counts a number up from 0 to its target value once it scrolls into view.
 * Preserves the original display format (commas, decimals, suffix).
 *
 * Architecture:
 *   - `useMotionValue` holds the raw animated number — no React state, so
 *     there are zero re-renders during the animation (runs entirely in the
 *     Framer Motion layer, updating the DOM directly).
 *   - `useTransform` converts the raw float into a formatted string:
 *     thousand separators for values >= 1000, correct decimal places.
 *   - `<motion.span>{display}</motion.span>` subscribes to the MotionValue
 *     and patches the DOM text node on every frame without React.
 *   - `useInView` fires `once: true` so the animation runs exactly once,
 *     regardless of how many times the user scrolls past the section.
 *
 * Easing:
 *   [0.16, 1, 0.3, 1] is an "expo out" cubic bezier — starts very fast
 *   (satisfying pop) and decelerates smoothly into the final value.
 *
 * `prefers-reduced-motion`:
 *   When the user has reduced motion enabled, globals.css overrides all
 *   transition durations to 0.01ms, so the counter jumps instantly to
 *   the final value without any animation.
 */
export function AnimatedCounter({
  value,
  className,
  duration = 1.8,
}: AnimatedCounterProps) {
  const { target, prefix, suffix, decimals, hasCommas } = parse(value);

  // Ref attached to the wrapper span — useInView watches when it enters viewport
  const ref = useRef<HTMLSpanElement>(null);
  // margin "-50px" = start counting 50px before the element fully enters view
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Raw animated float (0 → target). Lives outside React render cycle.
  const count = useMotionValue(0);

  // Derived formatted string — updated by Framer Motion, never triggers re-render
  const display = useTransform(count, (v) => {
    if (hasCommas) {
      // Restore thousand separators (en-US locale: 2400 → "2,400")
      return parseFloat(v.toFixed(decimals)).toLocaleString("en-US", {
        maximumFractionDigits: decimals,
      });
    }
    return v.toFixed(decimals);
  });

  useEffect(() => {
    if (!inView) return;

    // animate() returns a controller — stop it on cleanup in case the component
    // unmounts mid-animation (e.g. route change).
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out: fast pop → smooth deceleration
    });

    return () => controls.stop();
  }, [inView, count, target, duration]);

  return (
    // ref wrapper is a plain span so it doesn't affect layout
    <span ref={ref} className={className}>
      {prefix}
      {/* motion.span subscribes to `display` and patches the DOM text directly */}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
