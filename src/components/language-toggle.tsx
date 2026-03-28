'use client';

import { useState } from 'react';

export function LanguageToggle() {
    const [lang, setLang] = useState<'en' | 'vi'>('en');

    return (
        <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="w-8 h-8 rounded-lg border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800"
        >
            {lang.toUpperCase()}
        </button>
    );
}