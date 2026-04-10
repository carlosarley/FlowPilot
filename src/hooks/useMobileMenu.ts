import { useState, useCallback, useEffect } from "react";

interface UseMobileMenuReturn {
  /** Whether the mobile menu is currently open */
  isOpen: boolean;
  /** Toggle the menu open or closed */
  toggle: () => void;
  /** Explicitly close the menu (e.g., after a nav link is clicked) */
  close: () => void;
}

/**
 * Manages the open/closed state of the mobile navigation menu.
 *
 * Also locks body scroll while the menu is open to prevent the background
 * page from scrolling when the mobile overlay is visible.
 *
 * @returns `isOpen`, `toggle`, and `close` controls.
 */
export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when the menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, toggle, close };
}
