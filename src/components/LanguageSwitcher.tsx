import { useRouter } from 'next/router';
import Link from 'next/link';
import { supportedLocales, Locale } from '@/types/locale';

export default function LanguageSwitcher() {
  const { asPath, locale: currentLocale } = useRouter();

  return (
    <div className="flex items-center gap-3" aria-label="Language">
      {supportedLocales.map((locale: Locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className={`text-xs tracking-[0.12em] transition-colors duration-200 ${
            currentLocale === locale
              ? 'text-text'
              : 'text-text-secondary hover:text-text'
          }`}
          aria-current={currentLocale === locale ? 'page' : undefined}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
