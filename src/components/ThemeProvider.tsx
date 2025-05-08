'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context with a default value that matches the expected shape
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with light theme, will be updated in useEffect
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run this on the client side
    setMounted(true);

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update class on document when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Prevent flash of wrong theme by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
