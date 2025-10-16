'use client';

import Link from 'next/link';
import Button from '../../ui/Button/Button';
import { LoginOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import NavbarAvatar from '../NavbarAvatar/NavbarAvatar';

export default function AuthLinks() {
  const { isAuthenticated, isSessionLoading} = useAuth();

  return (
    <>
      {!isAuthenticated && !isSessionLoading ? (
        <Button variant='icon'>
          <Link href='/api/auth/signin'>
            <LoginOutlined />
          </Link>
        </Button>
      ) : (
        <>
          <Link href='/write'>Write</Link>
          <NavbarAvatar />
        </>
      )}
    </>
  );
}
