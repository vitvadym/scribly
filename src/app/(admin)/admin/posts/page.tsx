'use client';
import { Box, Button, Grid, Heading, HStack, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
import SearchInput from '@/components/admin/SearchInput/SearchInput';
import SortBy from '@/components/admin/Filter/SortBy';
import OrderBy from '@/components/admin/Filter/OrderBy';
import ResetFilters from '@/components/admin/Filter/ResetFilters';
import PostCard from '@/components/admin/PostCard/PostCard';
import { useLoadMore } from '@/hooks/useLoadMore';
import { PostWithAuthor } from '@/types';

const sortFields = [
  { label: 'Title', value: 'title' },
  { label: 'Date', value: 'date' },
];

//  await new Promise((resolve) => setTimeout(resolve, 2000))
export default function Posts() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderBy') || 'asc';
  const sortBy = searchParams.get('sortBy') || 'date';
  const search = searchParams.get('search') || '';

  const { data, hasMore, loadMore, isValidating } = useLoadMore<PostWithAuthor>(
    {
      endpoint: '/api/admin/posts',
      category: 'all',
      orderBy,
      sortBy,
      search,
      limit: 6,
    },
  );
  return (
    <Box p={4}>
      <VStack gap={8}>
        <HStack
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Heading size='2xl'>Posts</Heading>
          <Link
            href={'/write'}
            target='_blank'
          >
            <Button
              colorPalette={'teal'}
              p={4}
              size={'lg'}
            >
              Create New Post
            </Button>
          </Link>
        </HStack>

        <HStack
          justifyContent={'flex-start'}
          width={'100%'}
          mb={6}
        >
          <SearchInput />
          <SortBy fields={sortFields} />
          <OrderBy />
          <ResetFilters />
        </HStack>
      </VStack>

      <Grid
        templateColumns='repeat(4, minmax(300px, 1fr))'
        gap={4}
      >
        {data?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </Grid>
      {data && (
        <Box
          mt={5}
          textAlign={'center'}
        >
          <Button
            disabled={!hasMore}
            onClick={loadMore}
            loading={isValidating}
            colorPalette={'teal'}
            p={2}
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
