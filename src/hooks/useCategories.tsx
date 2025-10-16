import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { CategoryWithPostsCount } from '@/types';


export const useCategories = () => {
  const { data, isLoading, error, mutate, isValidating } =
    useSWR<CategoryWithPostsCount[]>('/api/admin/categories', fetcher);

  return {
    categories: data,
    isLoading,
    error,
    mutate,
    isValidating,
  };
};
