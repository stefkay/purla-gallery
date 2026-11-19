import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AnnouncementBar from './AnnouncementBar';

type AppHeaderProps = {
  className?: string;
};

export default function AppHeader({ className = '' }: AppHeaderProps) {
  const t = useTranslation();
  const { pathname, locale } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const trigger = menuButton.current;
    menuPanel.current?.querySelector<HTMLElement>('a')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = [
        menuButton.current,
        ...Array.from(menuPanel.current?.querySelectorAll<HTMLElement>('a, button') || []),
      ].filter((item): item is HTMLElement => item !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      trigger?.focus();
    };
  }, [isMenuOpen]);

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
    <header className={`site-header ${className}`}>
      <a href="#main-content" className="skip-link">
        {locale === 'bg' ? 'Към съдържанието' : 'Skip to content'}
      </a>
      <AnnouncementBar />
      <div className="header-inner">
        <Link href="/" onClick={closeMenu} className="header-logo">
          <Logo />
        </Link>

        <nav aria-label="Primary navigation" className="header-nav">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className="header-nav-link"
          >
            {t.home}
          </Link>
          <Link
            href="/gallery"
            aria-current={pathname.startsWith('/gallery') ? 'page' : undefined}
            className="header-nav-link"
          >
            {t.gallery}
          </Link>
        </nav>

        <div className="header-tools">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <button
          ref={menuButton}
          id="menu-button"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={`menu-line ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`menu-line ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>

        {isMenuOpen && (
          <div ref={menuPanel} id="mobile-menu" className="mobile-menu">
            <nav aria-label="Mobile navigation" className="mobile-menu-nav">
              <Link href="/" onClick={closeMenu} className="mobile-menu-link">
                {t.home}
              </Link>
              <Link href="/gallery" onClick={closeMenu} className="mobile-menu-link">
                {t.gallery}
              </Link>
            </nav>
            <div className="mobile-menu-tools">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
