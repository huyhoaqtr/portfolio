'use client';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import dynamic from 'next/dynamic';
import { AppProvider } from '@/context/app-context';
import WidgetGroup from '@/components/widget-group';
const Background3D = dynamic(
  () => import('@/components/background-3d').then((m) => m.Background3D),
  { ssr: false },
);


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppProvider>
        <body className="min-h-screen bg-[#09090b] selection:bg-blue-500/30 selection:text-white">
          <Background3D />
          <div className="relative z-10">
            <ScrollProgress />
            <Header />
            {children}
            <Footer />
            <WidgetGroup />
          </div>
        </body>
      </AppProvider>
    </ThemeProvider>
  );
}
