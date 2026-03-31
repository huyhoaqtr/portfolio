'use client';

import { Provider } from 'react-redux';
import { useRef } from 'react';
import type { AppStore } from '@/redux/store/index';
import { makeStore } from '@/redux/store/index';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
