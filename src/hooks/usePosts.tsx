import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { type PostWithAuthor } from '@/types';

export const usePosts = () => {
  const { data, isLoading, error } = useSWR<{ posts: PostWithAuthor[] }>(
    '/api/posts',
    fetcher,
  );

  return {
    posts: data?.posts,
    isLoading,
    error,
  };
};
