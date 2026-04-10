import { useState, useEffect } from "react";

/**
 * Detects whether the user has scrolled past a given pixel threshold.
 *
 * Used to trigger visual state changes in the navigation bar (e.g., adding
 * a background and shadow once the user scrolls away from the top).
 *
 * @param threshold - Number of pixels scrolled before returning `true`. Defaults to 20.
 * @returns `true` if the page has been scrolled past the threshold, `false` otherwise.
 */
export function useScrollDetection(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check immediately on mount in case the page loads mid-scroll
    setScrolled(window.scrollY > threshold);

    const handleScroll = () => setScrolled(window.scrollY > threshold);

    // passive: true improves scroll performance by signaling no preventDefault()
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
