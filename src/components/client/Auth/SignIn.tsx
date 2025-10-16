'use client';
import styles from './Auth.module.css';
import {
  GoogleOutlined,
  GithubOutlined,
  // UserOutlined,
} from '@ant-design/icons';
import Button from '@/components/ui/Button/Button';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.divider}>Continue with</div>

      <div className={styles.oauthButtons}>
        <Button
          onClick={() => signIn('google')}
          icon={GoogleOutlined}
          className={styles.oauth}
        >
          {' '}
          Google
        </Button>
        <Button
          onClick={() => signIn('github')}
          icon={GithubOutlined}
          className={styles.oauth}
        >
          {' '}
          GitHub
        </Button>
      </div>
    </div>
  );
}
