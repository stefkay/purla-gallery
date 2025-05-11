export const tagStyles = {
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium',
  variants: {
    neutral: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-secondary-800',
    accent: 'bg-accent text-accent-800',
    success: 'bg-success text-success-800',
    warning: 'bg-warning text-warning-800',
    error: 'bg-error text-error-800',
  },
  sizes: {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  },
} as const;

export type TagVariant = keyof typeof tagStyles.variants;
export type TagSize = keyof typeof tagStyles.sizes;
