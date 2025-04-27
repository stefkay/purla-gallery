import { useRouter } from 'next/router';
import Link from 'next/link';
import { supportedLocales, Locale } from '@/types/locale';

export default function LanguageSwitcher() {
  const { asPath, locale: currentLocale } = useRouter();

  return (
    <div className="flex items-start gap-2">
      {supportedLocales.map((locale: Locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className={`link ${
            currentLocale === locale
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-300'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
