'use client';
import React from 'react';

import { StoreProvider } from '@/redux/store/store-provider';
import { AppRuntimeEffects } from '@/redux/app/app-runtime-effects';


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AppRuntimeEffects />
      {children}
    </StoreProvider>
  );
}
