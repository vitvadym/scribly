import { Asset } from '@/db/schema/asset';
import { fetcher } from '@/lib/fetcher';
import { PostWithCategory } from '@/types';
import useSWR from 'swr';

export const useSinglePost = (slug: string) => {
  const { data, error, isLoading } = useSWR<
    PostWithCategory & { asset: Asset }
  >(`/api/posts/edit/${slug}`, fetcher);
  return {
    data,
    isLoading,
    error,
  };
};
