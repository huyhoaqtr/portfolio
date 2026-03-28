'use client';

import { useState } from 'react';

export function LanguageToggle() {
  const [lang, setLang] = useState<'en' | 'vi'>('en');

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
      type="button"
      className="icon-button h-8 w-8 rounded-lg px-2 py-1 text-xs font-semibold uppercase"
    >
      {lang.toUpperCase()}
    </button>
  );
}
