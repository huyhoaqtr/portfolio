'use client';
import Link from 'next/link';
import AppLogo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="w-full max-w-7xl px-6">
        <div className="header-container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 text-[13px] font-medium text-zinc-500 md:flex">
              {nav.map((i) => (
                <Link key={i.href} href={i.href} className="hover:text-blue-400">
                  {i.label}
                </Link>
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
