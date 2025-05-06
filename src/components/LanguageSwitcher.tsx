import { useRouter } from 'next/router';
import Link from 'next/link';
import { supportedLocales, Locale } from '@/types/locale';

export default function LanguageSwitcher() {
  const { asPath, locale: currentLocale } = useRouter();

  return (
    <div className="flex items-start gap-1">
      {supportedLocales.map((locale: Locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className={`btn btn-sm ${
            currentLocale === locale ? 'bg-primary text-primary-content' : 'btn-ghost'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
