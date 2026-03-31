'use client';
import { useTranslations } from 'next-intl';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { toggleTheme } from '@/redux/app/themeSlice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const t = useTranslations('themeToggle');

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      type="button"
      aria-label={theme === 'dark' ? t('toLight') : t('toDark')}
      className="icon-button h-8 w-8 rounded-lg p-2"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} /> }
    </button>
  );
}
