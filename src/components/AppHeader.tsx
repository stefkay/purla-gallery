import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';

type AppHeaderProps = {
  className?: string;
};

export default function AppHeader({ className = '' }: AppHeaderProps) {
  const t = useTranslation();

  return (
    <header className={`w-full fixed top-0 left-0 z-50 bg-bg bg-opacity-95 backdrop-blur-sm shadow-sm ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="transition-opacity duration-200 hover:opacity-80">
          <Logo />
        </Link>
        <nav className="flex justify-center space-x-8">
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
        <div className="flex justify-end items-center gap-5">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
