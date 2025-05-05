import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';
import { useState, useEffect } from 'react';

type AppHeaderProps = {
  className?: string;
};

export default function AppHeader({ className = '' }: AppHeaderProps) {
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the click is outside both the menu card and the menu button
      if (!target.closest('.menu-card') && !target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 bg-bg/95 backdrop-blur-sm shadow-sm ${className}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="transition-opacity duration-200 hover:opacity-80 z-20">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center space-x-8">
          <Link
            href="/"
            className="text-text hover:text-primary transition-colors duration-200 font-medium text-lg"
          >
            {t.home}
          </Link>
          <Link
            href="/gallery"
            className="text-text hover:text-primary transition-colors duration-200 font-medium text-lg"
          >
            {t.gallery}
          </Link>
        </nav>

        <div className="hidden md:flex justify-end items-center gap-5">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          className="md:hidden z-20 p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span
              className={`block h-0.5 bg-text transition-all duration-300 ease-out ${
                isMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-text transition-all duration-300 ease-out ${
                isMenuOpen ? 'w-0 opacity-0' : 'w-4'
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-text transition-all duration-300 ease-out ${
                isMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'
              }`}
            ></span>
          </div>
        </button>

        {/* Mobile Menu - Two-layer approach for better cross-browser support */}
        {isMenuOpen && (
          <>
            {/* Backdrop overlay - solid color with high opacity */}
            <div className="fixed inset-0 z-10 md:hidden bg-bg/75"></div>

            {/* Menu container */}
            <div
              id="mobile-menu"
              className="fixed inset-0 z-20 md:hidden flex flex-col items-center justify-start pt-24 px-4"
            >
              {/* Menu card with solid background and shadow */}
              <div className="menu-card bg-secondary opacity-80 py-12 px-8 rounded-lg shadow-lg w-full max-w-sm">
                <nav className="flex flex-col items-center space-y-8 mb-10">
                  <Link
                    href="/"
                    className="text-text hover:text-primary transition-colors duration-200 font-medium text-2xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.home}
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-text hover:text-primary transition-colors duration-200 font-medium text-2xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.gallery}
                  </Link>
                </nav>
                <div className="flex items-center justify-center gap-8 pt-4 border-t border-bg-tertiary">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
