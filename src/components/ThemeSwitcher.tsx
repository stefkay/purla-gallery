'use client';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import useTheme from '@/hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 text-text-secondary transition-colors duration-200 hover:text-text focus:outline-none focus-visible:ring-1 focus-visible:ring-text"
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5 text-text transition-colors" />
      ) : (
        <SunIcon className="w-5 h-5 text-text transition-colors" />
      )}
    </button>
  );
}
