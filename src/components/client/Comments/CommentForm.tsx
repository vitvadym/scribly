'use client';

import styles from './Comments.module.css';
import Button from '../../ui/Button/Button';
import React, { useState, useTransition } from 'react';
import {
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { createComment } from '@/actions/comment';

export default function CommentForm({ postSlug }: { postSlug: string }) {
  const { isAuthenticated } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [comment, setComment] = useState('');

  console.log({ comment });

  if (!isAuthenticated) {
    return <p>Sign in to leave a comment.</p>;
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('comment', comment);
    formData.append('slug', postSlug);

    startTransition(async () => {
      await createComment(formData);
    });

    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        hidden
        readOnly
        name='slug'
        value={postSlug}
      />
      <textarea
        name='comment'
        placeholder='Leave a comment...'
        className={styles.textarea}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        rows={4}
        required
      />
      <Button
        variant='outline'
        disabled={!comment}
        type='submit'
        className={styles.button}
      >
        {isPending ? <LoadingOutlined /> : <PlusOutlined />}
      </Button>
    </form>
  );
}
