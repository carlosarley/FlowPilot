import type { Variants } from "framer-motion";

/**
 * Returns a shared set of Framer Motion animation variant objects for
 * consistent entrance animations across all landing page sections.
 *
 * Using a single hook keeps timing and easing values in one place —
 * change them here and every section updates automatically.
 *
 * Variants follow the `hidden` → `visible` convention so any
 * `whileInView`, `initial`, and `animate` prop can reference them by name.
 */
export function useAnimationVariants() {
  /** Fade in while sliding up — the default entrance for most elements */
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /** Fade in while sliding in from the left — used for metric cards */
  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /** Fade in while sliding in from the right — used for copy blocks */
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /**
   * Wrapper variant for a list of staggered children.
   * Apply to the parent container; children should use `staggerItem`.
   */
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  /**
   * Individual item variant for use inside a `staggerContainer`.
   * Each child fades up with a slight delay relative to its siblings.
   */
  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  /**
   * Subtle scale + fade variant for the hero mockup entrance.
   * Delayed slightly so it follows the copy block animation.
   */
  const heroMockup: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.15, ease: "easeOut" },
    },
  };

  return { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, heroMockup };
}
