'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../AuthLinks/AuthLinks';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import Button from '../../ui/Button/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ERole } from '@/types/role';

export default function Navbar() {
  const { isAuthenticated, userRole } = useAuth();

  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  useEffect(() => {
    if (open && isMobile) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link href='/'>Scribbly</Link>
        {isAuthenticated && userRole === ERole.ADMIN && (
          <Button variant='outline'>
            <Link
              href='/admin'
              target='_blank'
            >
              Admin
            </Link>
          </Button>
        )}
      </div>
      <div className={styles.actions}>
        <ThemeToggle />
        {/* TODO: add search bar */}
        <nav className={styles.links}>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
          <AuthLinks />
        </nav>
        <div className={styles.burger}>
          <Button
            variant='icon'
            onClick={toggleMenu}
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        </div>
      </div>
      {open && isMobile && (
        <div className={styles.mobileMenu}>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
          <AuthLinks />
        </div>
      )}
    </header>
  );
}
