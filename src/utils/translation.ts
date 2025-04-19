import { supportedLocales, type Locale } from '@/types/locale';
import en from '@/../public/locales/en/common.json';
import bg from '@/../public/locales/bg/common.json';
import { useRouter } from 'next/router';

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

const translations = { en, bg };

export function useTranslation() {
  const { locale: rawLocale } = useRouter();
  const locale: Locale = ['en', 'bg'].includes(rawLocale ?? '') ? (rawLocale as Locale) : 'en';

  return translations[locale];
}
