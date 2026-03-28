'use client';

import { useLocale, useTranslations } from '@/context/locale-context';

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations('languageToggle');

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
      type="button"
      aria-label={t('label')}
      className="icon-button h-8 w-8 rounded-lg px-2 py-1 text-xs font-semibold uppercase"
    >
      {locale.toUpperCase()}
    </button>
  );
}
