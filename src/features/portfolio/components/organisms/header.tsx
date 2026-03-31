'use client';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageToggle, ThemeToggle, AppLogo } from '@/common/components';

export function Header() {
  const t = useTranslations('common.nav');
  const nav = [
    { href: '#projects', label: t('projects') },
    { href: '#experience', label: t('experience') },
    { href: '#skills', label: t('skills') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="w-full max-w-7xl px-6">
        <div className="header-container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 text-[13px] font-medium text-muted-foreground md:flex">
              {nav.map((i) => (
                <NextLink key={i.href} href={i.href} className="hover:text-primary">
                  {i.label}
                </NextLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 pointer-events-auto">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
