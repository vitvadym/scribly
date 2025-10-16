import PostList from '@/components/client/PostList/PostList';
import React from 'react';

export default async function Category({
  params,
}: {
  params: Promise<{ value: string }>;
}) {
  const { value } = await params;

  const title = `Posts with category: ${value}`;

  return (
    <PostList
      category={value}
      title={title}
    />
  );
}
