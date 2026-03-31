'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageToggle');

  return (
    <button
      onClick={() => router.replace(pathname, { locale: locale === 'en' ? 'vi' : 'en' })}
      type="button"
      aria-label={t('label')}
      className="icon-button h-8 w-8 rounded-lg px-2 py-1 text-xs font-semibold uppercase"
    >
      {locale.toUpperCase()}
    </button>
  );
}
