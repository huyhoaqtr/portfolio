'use client';
import Link from 'next/link';
import Image from 'next/image';
import AppLogo from '@/components/logo';

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className='w-full max-w-7xl px-6'>
        <div className="header-container">
          <Link href="/" className="group relative flex items-center gap-2">
            <AppLogo />
          </Link>
          <nav className="hidden gap-6 text-[13px] font-medium text-zinc-500 md:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="transition hover:text-blue-400"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
