'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Post } from '@/db/schema/post';

type PostWithAuthor = Post & { author: { name: string } };
export const useRecentPosts = () => {
  const { data, isLoading, error } = useSWR<{ recentPosts: PostWithAuthor[] }>(
    '/api/posts/recent',
    fetcher,
  );

  return {
    posts: data?.recentPosts,
    isLoading,
    error,
  };
};
