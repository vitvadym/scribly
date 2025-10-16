import PostCardMinimal from '@/components/client/PostCardMinimal/PostCardMinimal';
import { auth } from '@/lib/auth';
import { getUserPublishedPosts } from '@/utils/server-utils';
import React from 'react';

export default async function PublishedPosts() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return;

  const publishedPosts = await getUserPublishedPosts(userId);
  if (!publishedPosts?.length) {
    return <p>No published posts found.</p>;
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {publishedPosts.map((post) => (
        <PostCardMinimal
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
