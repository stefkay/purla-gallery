import { useRouter } from 'next/router';
import Link from 'next/link';
import { supportedLocales, Locale } from '@/types/locale';

export default function LanguageSwitcher() {
  const { asPath, locale: currentLocale } = useRouter();

  return (
    <div className="flex items-center gap-1.5">
      {supportedLocales.map((locale: Locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentLocale === locale
              ? 'btn-primary shadow-sm'
              : 'btn-secondary shadow-none'
          }`}
          aria-current={currentLocale === locale ? 'page' : undefined}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
