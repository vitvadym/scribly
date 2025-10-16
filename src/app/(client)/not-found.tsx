import React from 'react';
import styles from './404.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Image
        src={'/404.png'}
        alt='404'
        width={500}
        height={450}
      />
      <Button variant='outline'>
        <Link href={'/'}>Home</Link>
      </Button>
    </div>
  );
}
