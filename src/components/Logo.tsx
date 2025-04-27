import { useEffect, useState } from 'react';
import { ThemeId } from '@/styles/theme-config';
import Image from 'next/image';

export default function Logo() {
  const [theme, setTheme] = useState<ThemeId>('light');

  useEffect(() => {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('theme-dark') ? 'dark' : 'light';
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      const updatedTheme = html.classList.contains('theme-dark') ? 'dark' : 'light';
      setTheme(updatedTheme);
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={theme === 'light' ? '/purla_logo.svg' : '/purla_logo_white.svg'}
      alt="Purla"
      width={60}
      height={60}
    />
  );
}
