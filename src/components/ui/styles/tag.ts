export const tagStyles = {
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium text-text',
  variants: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  },
  sizes: {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  },
} as const;

export type TagVariant = keyof typeof tagStyles.variants;
export type TagSize = keyof typeof tagStyles.sizes;
