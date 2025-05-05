import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import { colorTokens } from '@/utils/color-utils';

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
      bg: colorTokens.lightBg,
      text: colorTokens.lightText,
      accent: colorTokens.accent,
      primary: colorTokens.primary,
      secondary: colorTokens.secondary,
      preview: colorTokens.primary,
    },
    icon: SunIcon,
  },
  dark: {
    label: 'Dark',
    className: 'theme-dark',
    palette: {
      bg: colorTokens.darkBg,
      text: colorTokens.darkText,
      accent: colorTokens.accent,
      primary: colorTokens.primary,
      secondary: colorTokens.secondary,
      preview: colorTokens.primary,
    },
    icon: MoonIcon,
  },
};
