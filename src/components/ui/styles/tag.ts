export const tagStyles = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium',
  variants: {
    neutral: 'bg-neutral-100 text-neutral-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
  },
  sizes: {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  },
} as const;

export type TagVariant = keyof typeof tagStyles.variants;
export type TagSize = keyof typeof tagStyles.sizes; 