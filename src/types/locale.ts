export const supportedLocales = ['en', 'bg'] as const;
export type Locale = (typeof supportedLocales)[number];

export type LocalizedString = Record<Locale, string>;
export type LocalizedNumber = Record<Locale, number>;
