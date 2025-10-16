import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Post } from '@/db/schema/post';

export const useFeaturedPosts = () => {
  const { data, isLoading, error } = useSWR<{ featuredPosts: Post[] }>(
    '/api/posts/featured',
    fetcher,
  );

  return {
    featuredPosts: data?.featuredPosts,
    isLoading,
    error,
  };
};
