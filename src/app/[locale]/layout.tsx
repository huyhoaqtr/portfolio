import '../globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Providers from '../providers';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem('theme');
      const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
      const root = document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      root.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const localeForOg = locale === 'vi' ? 'vi_VN' : 'en_US';

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        vi: '/vi',
      },
    },
    icons: {
      icon: '/logo.svg',
      apple: '/logo.svg',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale: localeForOg,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
