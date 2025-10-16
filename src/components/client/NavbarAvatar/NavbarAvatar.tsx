'use client';
import Image from 'next/image';
import styles from './NavbarAvatar.module.css';
import { useAuth } from '@/hooks/useAuth';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import { signOut } from 'next-auth/react';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function NavbarAvatar({
  height = 30,
  width = 30,
}: {
  height?: number;
  width?: number;
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div className={styles.container}>
      <Image
        onClick={handleOpenDropdown}
        className={styles.avatar}
        src={user?.avatar || 'https://avatar.iran.liara.run/public'}
        alt='avatar'
        width={width}
        height={height}
      />
      {openDropdown && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
        >
          <Button
            variant='ghost'
            onClick={handleCloseDropdown}
          >
            <Link href={`/profile/${user?.id}/drafts`}>Drafts</Link>
          </Button>
          <Button
            variant='ghost'
            onClick={handleCloseDropdown}
          >
            <Link href={`/profile/${user?.id}/published`}>My posts</Link>
          </Button>
          <Button
            variant='outline'
            // icon={LogoutOutlined}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
