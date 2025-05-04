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
    <div className="flex gap-1 items-start">
      {Object.entries(themeConfig).map(([id, { icon }]) => {
        const Icon = icon;
        return (
          <button
            key={id}
            className={`btn btn-sm ${
              theme === id
                ? 'bg-primary text-primary-content'
                : 'bg-white text-black'
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
