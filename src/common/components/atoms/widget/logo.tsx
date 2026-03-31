'use client';
import { useTranslations } from 'next-intl';

export function AppLogo() {
  const t = useTranslations('logo');

  return (
    <div className="flex items-center">
      <img src="/logo.svg" alt={t('alt')} className="mr-2 h-9 w-9" />
      <div className="flex flex-col items-start font-bold">
        <span className="text-xs text-foreground">huyhoaq.tr</span>
        <span className="text-xs text-muted-foreground">{t('role')}</span>
      </div>
    </div>
  );
}
