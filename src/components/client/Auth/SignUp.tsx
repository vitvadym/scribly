'use client';
import React, { useState } from 'react';
import styles from './Auth.module.css';
import {
  GoogleOutlined,
  GithubOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form
          // className={styles.formContainer}
          onSubmit={handleSubmit}
        >
          <h2 className={styles.title}>Create Account</h2>

          <div className={styles.inputGroup}>
            <UserOutlined className={styles.icon} />
            <input
              name='name'
              type='text'
              placeholder='Full Name'
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <MailOutlined className={styles.icon} />
            <input
              name='email'
              type='email'
              placeholder='Email'
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <LockOutlined className={styles.icon} />
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <Button
            type='submit'
            className={styles.button}
          >
            Sign Up
          </Button>
        </form>
        <div className={styles.divider}>or continue with</div>

        <div className={styles.oauthButtons}>
          <Button
            icon={GoogleOutlined}
            className={styles.oauth}
          >
            {' '}
            Google
          </Button>
          <Button
            icon={GithubOutlined}
            className={styles.oauth}
          >
            {' '}
            GitHub
          </Button>
        </div>

        <div className={styles.loginLink}>
          Already have an account? <Link href='/sign-in'>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
