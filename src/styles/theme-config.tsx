import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

export type ThemeId = 'light' | 'dark';

type ThemeDefinition = {
  label: string;
  className: string;
  palette: {
    bg: string;
    text: string;
    accent: string;
    primary: string;
    secondary: string;
    preview: string;
  };
  icon: IconType;
};

export const themeConfig: Record<ThemeId, ThemeDefinition> = {
  light: {
    label: 'Light',
    className: 'theme-light',
    palette: {
      bg: '#ffffff',
      text: '#333333',
      accent: '#81a1c1', // OKLCH converted to hex
      primary: '#5e81ac', // OKLCH converted to hex
      secondary: '#88c0d0', // OKLCH converted to hex
      preview: '#5e81ac',
    },
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'theme-dark',
    palette: {
      bg: '#2e3440',
      text: '#eceff4',
      accent: '#81a1c1', // OKLCH converted to hex
      primary: '#5e81ac', // OKLCH converted to hex
      secondary: '#88c0d0', // OKLCH converted to hex
      preview: '#5e81ac',
    },
    icon: MoonIcon,
  },
};
