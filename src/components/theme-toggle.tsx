'use client';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/context/theme-context';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const t = useTranslations('themeToggle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={theme === 'dark' ? t('toLight') : t('toDark')}
      className="icon-button h-8 w-8 rounded-lg p-2"
    >
      {mounted ? theme === 'dark' ? <Sun size={16} /> : <Moon size={16} /> : null}
    </button>
  );
}
