'use client';

import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/components/ThemeProvider';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  return context;
}

export default useTheme;
