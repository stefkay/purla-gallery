import Link from 'next/link';
import { useTranslation } from '@/utils/translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';

export default function AppHeader() {
  const t = useTranslation();

  return (
    <header className="flex justify-between items-center">
      <Logo />
      <nav className="flex justify-center space-x-8">
        <Link href="/" className="link">
          {t.home}
        </Link>
        <Link href="/gallery" className="link">
          {t.gallery}
        </Link>
      </nav>
      <div className="flex justify-end gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
