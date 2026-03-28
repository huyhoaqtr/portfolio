'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  defaultLocale,
  getLocale,
  getMessages,
  getMessageValue,
  localeCookieName,
  translateMessage,
  type Locale,
  type Messages,
} from '@/lib/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(getLocale(initialLocale));
  const messages = getMessages(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}

export function useTranslations(namespace?: string) {
  const { messages } = useLocale();

  return (key: string, values?: Record<string, string | number>) => {
    const path = namespace ? `${namespace}.${key}` : key;
    return translateMessage(messages, path, values);
  };
}

export function useTranslationValue<T = unknown>(path: string) {
  const { messages } = useLocale();
  return getMessageValue<T>(messages, path);
}
