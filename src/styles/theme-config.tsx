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
      bg: '#f7f4f1',
      text: '#1f2937',
      accent: '#db915f',
      primary: '#db915f',
      secondary: '#a27551',
      preview: '#db915f',
    },
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'theme-dark',
    palette: {
      bg: '#1f2937',
      text: '#f7f4f1',
      accent: '#db915f',
      primary: '#db915f',
      secondary: '#a27551',
      preview: '#db915f',
    },
    icon: MoonIcon,
  },
  earthy: {
    label: 'Earthy',
    className: 'theme-earthy',
    palette: {
      bg: '#f7f4f1',
      text: '#3e2f25',
      accent: '#a27551',
      primary: '#a27551',
      secondary: '#8b5cf6',
      preview: '#a27551',
    },
    icon: FireIcon,
  },
};
