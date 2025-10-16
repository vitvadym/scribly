import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/lib/fetcher';

type PrevPageData<T> = {
  hasMore: boolean;
  data: T[];
};

type Config = {
  endpoint: string;
  limit: number;
  category?: string;
  orderBy?: string;
  sortBy?: string;
  search?: string;
};

const getKey = <T,>(
  config: Config,
  pageIndex: number,
  previousPageData?: PrevPageData<T> | null,
): string | null => {
  const { endpoint, category, orderBy, sortBy, search, limit } = config;
  if (previousPageData && !previousPageData.hasMore) return null;

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: (pageIndex + 1).toString(),
    ...(category && { category }),
    ...(orderBy && { orderBy }),
    ...(sortBy && { sortBy }),
    ...(search && { search }),
  });

  return `${endpoint}?${params.toString()}`;
};

export const useLoadMore = <T,>(config: Config) => {
  const { data, isValidating, setSize, size, error, isLoading, mutate } =
    useSWRInfinite<PrevPageData<T>>(
      (pageIndex, previousPageData: PrevPageData<T> | null) => {
        return getKey<T>(config, pageIndex, previousPageData);
      },
      fetcher,
      {
        keepPreviousData: true,
      },
    );
  const flattenData = data?.flatMap((page) => page.data) || [];
  const hasMore = data?.[data.length - 1]?.hasMore;

  const loadMore = () => {
    setSize(size + 1);
  };

  return {
    data: flattenData,
    hasMore,
    isValidating,
    loadMore,
    error,
    isLoading,
    mutate,
  };
};
