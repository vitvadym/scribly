'use client';
import { Box, Button, Grid, Heading, HStack, VStack } from '@chakra-ui/react';

// import Link from 'next/link';
import SearchInput from '@/components/admin/SearchInput/SearchInput';
import OrderBy from '@/components/admin/Filter/OrderBy';
import ResetFilters from '@/components/admin/Filter/ResetFilters';
import CommentCard from '@/components/admin/CommentCard/CommentCard';
import { useLoadMore } from '@/hooks/useLoadMore';
import { CommentWithAuthor } from '@/types';
import { useSearchParams } from 'next/navigation';

export default function Comments() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderBy') || 'asc';
  const search = searchParams.get('search') || '';
  const { data, hasMore, loadMore, isValidating } =
    useLoadMore<CommentWithAuthor>({
      endpoint: '/api/admin/comments',
      limit: 6,
      orderBy,
      search,
    });

  return (
    <Box p={4}>
      <VStack gap={8}>
        <Box
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Heading size='2xl'>Comments</Heading>
        </Box>

        <HStack
          justifyContent={'flex-start'}
          width={'100%'}
          mb={6}
        >
          <SearchInput />
          <OrderBy />
          <ResetFilters />
        </HStack>
      </VStack>

      <Grid
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
        gap={4}
      >
        {data?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
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
