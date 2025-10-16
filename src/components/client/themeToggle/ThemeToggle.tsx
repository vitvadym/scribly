'use client';

import Button from '../../ui/Button/Button';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
// import { useTheme } from '@/context/ThemeContext';
import { useTheme } from '@/store/useTheme';
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='icon'
      onClick={toggleTheme}
    >
      {theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
    </Button>
  );
}
