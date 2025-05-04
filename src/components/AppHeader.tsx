import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';

export default function AppHeader() {
  const t = useTranslation();

  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="link">
        <Logo />
      </Link>
      <nav className="flex justify-center space-x-8">
        <Link href="/" className="link color-text text-lg">
          {t.home}
        </Link>
        <Link href="/gallery" className="link color-text text-lg">
          {t.gallery}
        </Link>
      </nav>
      <div className="flex justify-end items-center gap-5">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
