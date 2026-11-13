import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import AnnouncementBar from './AnnouncementBar';

type AppHeaderProps = {
  className?: string;
};

export default function AppHeader({ className = '' }: AppHeaderProps) {
  const t = useTranslation();
  const {pathname} = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b editorial-rule bg-bg ${className}`}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-bg focus:p-3">{pathname.startsWith('/bg') ? 'Към съдържанието' : 'Skip to content'}</a>
      <AnnouncementBar />
      <div className="flex h-[var(--header-height)] items-center justify-between px-[var(--page-gutter)]">
        <Link href="/" onClick={closeMenu} className="relative z-30 -ml-2 transition-opacity hover:opacity-60">
          <Logo />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-10 md:flex">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className="text-sm tracking-[0.12em] text-text transition-colors hover:text-text-secondary aria-[current=page]:underline underline-offset-8">
            {t.home}
          </Link>
          <Link href="/gallery" aria-current={pathname.startsWith('/gallery') ? 'page' : undefined} className="text-sm tracking-[0.12em] text-text transition-colors hover:text-text-secondary aria-[current=page]:underline underline-offset-8">
            {t.gallery}
          </Link>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <button
          id="menu-button"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="relative z-30 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={`absolute h-px w-6 bg-text transition-transform ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-px w-6 bg-text transition-transform ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>

        {isMenuOpen && (
          <div id="mobile-menu" className="fixed inset-0 z-20 flex flex-col bg-bg px-6 pb-10 pt-32 md:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-6 border-y editorial-rule py-8">
              <Link href="/" onClick={closeMenu} className="font-heading text-5xl leading-none">
                {t.home}
              </Link>
              <Link href="/gallery" onClick={closeMenu} className="font-heading text-5xl leading-none">
                {t.gallery}
              </Link>
            </nav>
            <div className="mt-auto flex items-center justify-between border-t editorial-rule pt-6">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
