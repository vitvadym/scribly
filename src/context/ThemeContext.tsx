'use client';

import { createContext, useState, useEffect, useContext } from 'react';

type ThemeProps = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeProps>({
  theme: 'light',
  toggleTheme: () => {},
});

const getValueFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light';
  }
  return 'light';
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(() => getValueFromLocalStorage());

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
