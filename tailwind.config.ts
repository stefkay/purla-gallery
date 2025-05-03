module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{scss,css}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',

        // UI Elements
        btn: {
          DEFAULT: 'var(--color-btn-bg)',
          text: 'var(--color-btn-text)',
        },
        input: 'var(--color-input-bg)',

        // Semantic colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',

        // Component-specific
        card: {
          DEFAULT: 'var(--card-bg)',
          shadow: 'var(--card-shadow)',
        },
        header: 'var(--header-bg)',
        footer: 'var(--footer-bg)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
      },
      fontSize: {
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
    },
  },
};
