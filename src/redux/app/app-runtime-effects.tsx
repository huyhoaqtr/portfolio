'use client';

import { useEffect } from 'react';
import { setScrollTopVisible } from '@/redux/app/layoutSlice';
import { setTheme, type ThemeMode } from '@/redux/app/themeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';

function resolveInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function AppRuntimeEffects() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(setTheme(resolveInitialTheme()));
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      dispatch(setScrollTopVisible(window.scrollY > 300));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch]);

  return null;
}
