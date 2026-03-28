import enMessages from '@/locales/en.json';
import viMessages from '@/locales/vi.json';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeCookieName = 'portfolio-locale';

export type Messages = typeof enMessages;

const catalogs: Record<Locale, Messages> = {
  en: enMessages,
  vi: viMessages,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'vi';
}

export function getLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs[defaultLocale];
}

export function getMessageValue<T = unknown>(messages: Messages, path: string): T {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, messages);

  if (typeof result === 'undefined') {
    throw new Error(`Missing translation key: ${path}`);
  }

  return result as T;
}

export function formatMessage(template: string, values?: Record<string, string | number>) {
  if (!values) return template;

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return typeof value === 'undefined' ? `{${key}}` : String(value);
  });
}

export function translateMessage(
  messages: Messages,
  path: string,
  values?: Record<string, string | number>,
) {
  const template = getMessageValue<unknown>(messages, path);

  if (typeof template !== 'string') {
    throw new Error(`Translation key "${path}" does not resolve to a string.`);
  }

  return formatMessage(template, values);
}

export function getTranslator(locale: Locale) {
  const messages = getMessages(locale);

  return (path: string, values?: Record<string, string | number>) =>
    translateMessage(messages, path, values);
}
