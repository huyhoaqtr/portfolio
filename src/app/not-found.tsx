'use client';
import { useTranslations } from '@/context/locale-context';

export default function NotFound() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">404</h1>
      <p className="text-muted-foreground">{t('notFound.description')}</p>
      <a className="font-medium text-primary hover:underline" href="/">
        {t('common.actions.returnHome')}
      </a>
    </main>
  );
}
