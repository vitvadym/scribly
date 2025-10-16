'use client';
import styles from './PostList.module.css';
import PostCard from '../PostCard/PostCard';
import PostCardSkeleton from '../PostCard/PostCardSkeleton';

import { PostWithAuthor } from '@/types';
import { useLoadMore } from '@/hooks/useLoadMore';
import LoadMore from '@/components/ui/LoadMoreButtom/LoadMore';

export default function PostList({
  category,
  title = 'Latest Posts',
}: {
  category: string;
  title?: string;
}) {
  const {
    data: posts,
    hasMore,
    isValidating,
    loadMore,
  } = useLoadMore<PostWithAuthor>({
    category,
    endpoint: '/api/posts',
    limit: 6,
    orderBy: 'asc',
    sortBy: 'date',

  });
  // TODO: Add error handling

  if (!posts) {
    return;
  }

  return (
    <div>
      <p className={styles.title}>{title}</p>
      <div className={styles.container}>
        {!posts?.length && !isValidating && <h3>No posts found</h3>}
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            postCard={post}
          />
        ))}
        {isValidating &&
          Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
      </div>
      {Boolean(posts?.length) && (
        <LoadMore
          hasMore={hasMore}
          loadMore={loadMore}
          isLoading={isValidating}
        />
      )}
    </div>
  );
}
