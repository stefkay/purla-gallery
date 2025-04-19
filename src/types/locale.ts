export const supportedLocales = ['en', 'bg'] as const

export type Locale = (typeof supportedLocales)[number]