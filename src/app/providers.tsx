'use client';
import React from 'react';
import { ThemeProvider } from '@/context/theme-context';
import { LocaleProvider } from '@/context/locale-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import dynamic from 'next/dynamic';
import { AppProvider } from '@/context/app-context';
import WidgetGroup from '@/components/widget-group';
import type { Locale } from '@/lib/i18n';
const Background3D = dynamic(
  () => import('@/components/background-3d').then((m) => m.Background3D),
  { ssr: false },
);

export default function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeProvider>
        <AppProvider>
          <Background3D />
          <div className="relative z-10">
            <ScrollProgress />
            <Header />
            {children}
            <Footer />
            <WidgetGroup />
          </div>
        </AppProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
