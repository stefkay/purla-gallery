'use client';
import { useEffect, useState } from 'react';
import { themeConfig, ThemeId } from '@/styles/theme-config';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>('dark');

  useEffect(() => {
    document.documentElement.className = themeConfig[theme].className;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeId;
    if (stored && themeConfig[stored]) {
      setTheme(stored);
    }
  }, []);

  return (
    <div className="flex gap-2 items-start">
      {Object.entries(themeConfig).map(([id, { icon, palette }]) => {
        const Icon = icon;
        return (
          <button
            key={id}
            className={`btn btn-xs ${
              theme === id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300'
            }`}
            onClick={() => setTheme(id as ThemeId)}
          >
            <Icon className="size-4 fill-accent" />
          </button>
        );
      })}
    </div>
  );
}
