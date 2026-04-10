"use client";

// ── Language context ──────────────────────────────────────────────────────────
//
// Provides the active language and a setter to all child components.
// Persists the user's choice in localStorage under "fp-lang" so their
// preference survives a page refresh.
//
// The `document.documentElement.lang` attribute is updated via useEffect so
// the <html> tag reflects the active language for screen readers and SEO
// crawlers — without requiring a server re-render.
//
// Default language is "en". The context is created with safe defaults so
// components can call useLanguage() without crashing if the Provider is
// accidentally missing higher up the tree.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Lang, type T } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // On first mount, read any persisted preference from localStorage.
  // Runs only once; the useState default ("en") handles SSR.
  useEffect(() => {
    const stored = localStorage.getItem("fp-lang");
    if (stored === "en" || stored === "es") setLangState(stored);
  }, []);

  // Keep the <html lang="…"> attribute in sync so assistive technologies
  // and search engines see the correct language code.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("fp-lang", l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Convenience hook — import this in every component that needs translated text.
export function useLanguage() {
  return useContext(LanguageContext);
}
