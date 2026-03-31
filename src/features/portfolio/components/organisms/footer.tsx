'use client';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border/80 py-10 text-center text-xs text-muted-foreground">
      <p>{t('footer.copyright', { year: new Date().getFullYear(), name: t('common.name') })}</p>
    </footer>
  );
}
