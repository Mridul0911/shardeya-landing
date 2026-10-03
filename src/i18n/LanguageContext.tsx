import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, type Content } from './en';
import { hi } from './hi';

export type Language = 'en' | 'hi';

const STORAGE_KEY = 'shardeya_lang';
const dictionaries: Record<Language, Content> = { en, hi };

interface LanguageContextValue {
  language: Language;
  t: Content;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readStoredLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'hi' || saved === 'en') return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — fall back to English.
  }
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = useCallback(() => setLanguage((l) => (l === 'en' ? 'hi' : 'en')), []);

  const value = useMemo(
    () => ({ language, t: dictionaries[language], toggleLanguage }),
    [language, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
