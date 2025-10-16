// 'use client';

// import Button from '../ui/Button/Button';
// import { toaster } from '../../ui/toaster';

import Link from 'next/link';

import {
  Container,
  Flex,
  Heading,
  HStack,
  Button,
  Grid,
  Stack,
} from '@chakra-ui/react';

import PostCard from '../PostCard/PostCard';
import CommentCard from '../CommentCard/CommentCard';
import { db } from '@/db';
import { desc } from 'drizzle-orm';
import { comment, post } from '@/db/schema';
import { PostWithAuthor } from '@/types';

export default async function RecentContent() {
  const latestPosts = await db.query.post.findMany({
    orderBy: desc(post.createdAt),
    limit: 6,
    with: {
      category: true,
      author: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
  });

  const latestComments = await db.query.comment.findMany({
    orderBy: desc(comment.createdAt),
    limit: 6,
    with: {
      post: {
        columns: {
          title: true,
          slug: true,
        },
      },
      user: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
  });
  return (
    <Flex
      mt={4}
      gap={8}
      justifyContent={'space-between'}
    >
      <Container
        p={4}
        w='3/4'
      >
        <HStack justifyContent={'space-between'}>
          <Heading mb={2}>Recent Posts</Heading>
          <Link href={'/admin/posts'}>
            <Button
              size={'md'}
              variant={'ghost'}
            >
              View all
            </Button>
          </Link>
        </HStack>
        <Grid
          templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
          gap={4}
        >
          {!latestPosts?.length && (
            <p>No posts yet</p>
          )}
          {latestPosts?.map((post) => (
            <PostCard
              key={post.id}
              post={post as PostWithAuthor}
            />
          ))}
        </Grid>
      </Container>

      <Container
        p={4}
        w='1/4'
      >
        <Stack justifyContent={'space-between'}>
          <HStack>
            <Heading size='xl'>Recent Comments</Heading>
            <Link href={'/admin/comments'}>
              <Button
                size={'md'}
                variant={'ghost'}
              >
                View all
              </Button>
            </Link>
          </HStack>

          {!latestComments?.length && (
            <p>No comments yet</p>
          )}

          {latestComments?.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))}
        </Stack>
      </Container>
    </Flex>
  );
}
