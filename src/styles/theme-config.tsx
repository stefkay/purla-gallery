import { SunIcon, MoonIcon, FireIcon } from '@heroicons/react/24/solid';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

export type ThemeId = 'light' | 'dark' | 'earthy';

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
      accent: '#5eead4',
      primary: '#fbbf24',
      secondary: '#d8b4fe',
      preview: '#fbbf24',
    },
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'theme-dark',
    palette: {
      bg: '#1e293b',
      text: '#f8fafc',
      accent: '#5eead4',
      primary: '#fbbf24',
      secondary: '#d8b4fe',
      preview: '#fbbf24',
    },
    icon: MoonIcon,
  },
  earthy: {
    label: 'Earthy',
    className: 'theme-earthy',
    palette: {
      bg: '#fef3c7',
      text: '#78350f',
      accent: '#5eead4',
      primary: '#fbbf24',
      secondary: '#d8b4fe',
      preview: '#fbbf24',
    },
    icon: FireIcon,
  },
};
