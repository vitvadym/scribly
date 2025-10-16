'use client';
import {
  Card,
  Text,
  IconButton,
  Flex,
  Icon,
  Avatar,
  HStack,
  Badge,
  Box,
} from '@chakra-ui/react';
import {
  DeleteOutlined,
  StarOutlined,
  CalendarOutlined,
  StarFilled,
} from '@ant-design/icons';
import {
  cardProps,
  toggleFeaturedButtonProps,
  imageWrapperProps,
  deleteButtonProps,
} from './styles';
import Image from 'next/image';
import Link from 'next/link';
import { PostWithAuthor } from '@/types';
import { useToggleFeaturePost } from '@/hooks/useToggleFeaturePost';
import { useDeletePostAdmin } from '@/hooks/useDeletePostAdmin';
import { usePathname } from 'next/navigation';
import { formatDate } from '@/utils/client-utils';

export default function PostCard({ post }: { post: PostWithAuthor }) {
  const pathname = usePathname();
  const isDashboardMainPage = pathname === '/admin';
  const { isUpdatingPost, toggleFeaturedTrigger } = useToggleFeaturePost();
  const { deleteTrigger, isDeletingPost } = useDeletePostAdmin();

  const handleDeletePost = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      await deleteTrigger({ postId: post.id });
    }
  };
  return (
    <Card.Root {...cardProps}>
      <Link
        href={`/post/${post.slug}`}
        target='_blank'
      >
        <Box {...imageWrapperProps}>
          <Image
            fill
            priority
            src={post.coverImage || 'https://placehold.co/800x600'}
            alt='Green double couch with wooden legs'
          />
        </Box>
      </Link>

      {!isDashboardMainPage && (
        <>
          <IconButton
            loading={isUpdatingPost}
            onClick={() => toggleFeaturedTrigger({ postId: post.id })}
            {...toggleFeaturedButtonProps}
          >
            {post.featured ? <StarFilled /> : <StarOutlined />}
          </IconButton>
          <IconButton
            {...deleteButtonProps}
            loading={isDeletingPost}
            onClick={handleDeletePost}
          >
            <DeleteOutlined />
          </IconButton>
        </>
      )}
      <Card.Body
        gap='2'
        justifyContent={'space-between'}
      >
        <Card.Title lineClamp={1}>{post.title}</Card.Title>
        <Text
          color={'gray.500'}
          lineClamp={2}
        >
          {post.description}
        </Text>
        <HStack py={2}>
          <Avatar.Root>
            <Avatar.Fallback>JD</Avatar.Fallback>
            <Avatar.Image
              src={post.author.image || 'https://avatar.iran.liara.run/public'}
            />
          </Avatar.Root>

          <Text>{post.author.name}</Text>
        </HStack>

        <Flex
          gap={4}
          mb={4}
          justify={'space-between'}
        >
          {/* temp */}
          <Badge
            fontSize={'xs'}
            px={2}
            rounded={'full'}
            color={'white'}
            backgroundColor={post.category.color}
            // colorPalette={'teal'}
          >
            {post.category.label}
          </Badge>

          <HStack color={'gray.400'}>
            <Icon>
              <CalendarOutlined />
            </Icon>
            <Text>{formatDate(post.createdAt)}</Text>
          </HStack>
        </Flex>
      </Card.Body>
      <Card.Footer
        justifyContent={'space-between'}
        gap='2'
      ></Card.Footer>
    </Card.Root>
  );
}
