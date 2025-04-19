import Link from 'next/link';
import { useTranslation } from '@/utils/translation';

export default function AppHeader() {
  const t = useTranslation();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">{t.home}</Link>
          </li>
          <li>
            <Link href="/gallery">{t.gallery}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
