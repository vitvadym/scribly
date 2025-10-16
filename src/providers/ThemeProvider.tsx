'use client';

import { useTheme } from '@/store/useTheme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return <div className={`theme-${theme}`}>{children}</div>;
};
