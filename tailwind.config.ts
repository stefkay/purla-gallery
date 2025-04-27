module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{scss,css}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        btn: {
          DEFAULT: 'var(--color-btn-bg)',
          text: 'var(--color-btn-text)',
        },
        input: 'var(--color-input-bg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-base)',
        lg: 'var(--radius-lg)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
    },
  },
};
