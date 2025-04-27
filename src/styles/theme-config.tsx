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
      text: '#1f2937',
      accent: '#db915f',
      preview: '#db915f',
    },
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'theme-dark',
    palette: {
      bg: '#1f2937',
      text: '#f9fafb',
      accent: '#db915f',
      preview: '#db915f',
    },
    icon: MoonIcon,
  },
};
