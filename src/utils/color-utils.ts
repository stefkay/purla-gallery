/**
 * Color Utilities
 *
 * This file contains utility functions for working with colors.
 * Since we're using OKLCH colors in our CSS but need hex values for our theme config,
 * we're providing a mapping of our color tokens to hex values.
 *
 * ⚠️ IMPORTANT: This file must be kept in sync with src/styles/color-tokens.scss
 * When updating colors here, make sure to update the corresponding values in color-tokens.scss
 *
 * The values in this file are used for:
 * - Theme configuration in theme-config.tsx
 * - Any JavaScript/TypeScript code that needs to reference colors
 */

export const colorTokens = {
  // Primary Colors
  primary: '#5e81ac', // oklch(59.435% 0.077 254.027)
  primaryLight: '#7b96b9', // oklch(69.435% 0.077 254.027)
  primaryDark: '#3b5e8c', // oklch(49.435% 0.077 254.027)

  // Secondary Colors
  secondary: '#88c0d0', // oklch(69.651% 0.059 248.687)
  secondaryLight: '#a5d3df', // oklch(79.651% 0.059 248.687)
  secondaryDark: '#6aa3b5', // oklch(59.651% 0.059 248.687)

  // Accent Colors
  accent: '#81a1c1', // oklch(77.464% 0.062 217.469)
  accentLight: '#a3bbd3', // oklch(87.464% 0.062 217.469)
  accentDark: '#5e87af', // oklch(67.464% 0.062 217.469)

  // Semantic Colors
  success: '#a3be8c', // oklch(76.827% 0.074 131.063)
  warning: '#ebcb8b', // oklch(85.486% 0.089 84.093)
  error: '#bf616a', // oklch(60.61% 0.12 15.341)
  info: '#b48ead', // oklch(69.207% 0.062 332.664)
  neutral: '#4c566a', // oklch(45.229% 0.035 264.131)

  // Light Theme Colors
  lightBg: '#ffffff',
  lightBgSecondary: '#f8f9ff',
  lightBgTertiary: '#e8ebff',
  lightText: '#333333',
  lightBorder: '#e8ebff',

  // Dark Theme Colors
  darkBg: '#2e3440',
  darkBgSecondary: '#3b4252',
  darkBgTertiary: '#434c5e',
  darkText: '#eceff4',
  darkBorder: '#4c566a',
};
