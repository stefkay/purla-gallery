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
        bg: {
          DEFAULT: 'var(--color-bg)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
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
        primary: {
          DEFAULT: 'var(--color-primary)',
          content: 'var(--color-primary-content)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          content: 'var(--color-secondary-content)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          content: 'var(--color-success-content)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          content: 'var(--color-warning-content)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          content: 'var(--color-error-content)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          content: 'var(--color-info-content)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          content: 'var(--color-neutral-content)',
        },

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
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        dark: 'var(--shadow-dark)',
        card: 'var(--card-shadow)',
      },
    },
  },
};
