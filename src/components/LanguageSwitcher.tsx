import { useRouter } from 'next/router';
import Link from 'next/link';
import { supportedLocales, Locale } from '@/types/locale';

export default function LanguageSwitcher() {
  const { asPath, locale: currentLocale } = useRouter();

  return (
    <div className="flex gap-2 text-sm">
      {supportedLocales.map((locale: Locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className={`px-2 py-1 rounded border ${
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
