import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

export type ThemeId = 'light' | 'dark';

// Color palette (single source of truth)
export const colors = {
  // Primary Colors - Nord Theme
  primary: {
    DEFAULT: '#5e81ac', // RGB: 94 129 172
    light: '#7b96b9', // RGB: 123 150 185
    dark: '#3b5e8c', // RGB: 59 94 140
  },

  // Secondary Colors
  secondary: {
    DEFAULT: '#88c0d0', // RGB: 136 192 208
    light: '#a5d3df', // RGB: 165 211 223
    dark: '#6aa3b5', // RGB: 106 163 181
  },

  // Accent Colors
  accent: {
    DEFAULT: '#81a1c1', // RGB: 129 161 193
    light: '#a3bbd3', // RGB: 163 187 211
    dark: '#5e87af', // RGB: 94 135 175
  },

  // Semantic Colors
  success: '#a3be8c', // RGB: 163 190 140
  warning: '#ebcb8b', // RGB: 235 203 139
  error: '#bf616a', // RGB: 191 97 106
  info: '#b48ead', // RGB: 180 142 173
  neutral: '#4c566a', // RGB: 76 86 106

  // Light Theme Colors
  light: {
    bg: '#ffffff', // RGB: 255 255 255
    bgSecondary: '#f8f9ff', // RGB: 248 249 255
    bgTertiary: '#e8ebff', // RGB: 232 235 255
    text: '#333333', // RGB: 51 51 51
    textSecondary: '#666666', // RGB: 102 102 102
    border: '#e8ebff', // RGB: 232 235 255
  },

  // Dark Theme Colors
  dark: {
    bg: '#2e3440', // RGB: 46 52 64
    bgSecondary: '#3b4252', // RGB: 59 66 82
    bgTertiary: '#434c5e', // RGB: 67 76 94
    text: '#eceff4', // RGB: 236 239 244
    textSecondary: '#d8dee9', // RGB: 216 222 233
    border: '#4c566a', // RGB: 76 86 106
  },
};

// Design tokens
export const tokens = {
  // Typography
  fontFamily: {
    body: "'Raleway', sans-serif",
    heading: "'Playfair Display', serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    dark: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
    },
  },
};

// Helper function to convert hex to RGB
export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}

// Theme definitions
type ThemeDefinition = {
  label: string;
  className: string;
  icon: IconType;
};

export const themeConfig: Record<ThemeId, ThemeDefinition> = {
  light: {
    label: 'Light',
    className: 'light',
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'dark',
    icon: MoonIcon,
  },
};
