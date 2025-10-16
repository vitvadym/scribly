'use client';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import { CommentWithAuthor } from '@/types';

export default function CommentCard({
  comment,
}: {
  comment: CommentWithAuthor;
}) {
  const pathname = usePathname();
  const isDashboardMainPage = pathname === '/admin';
  const { user, createdAt, content } = comment;

  return (
    <VStack
      align='flex-start'
      justifyContent={'space-between'}
      p={4}
      shadow={'md'}
    >
      <HStack>
        <Avatar.Root>
          <Avatar.Image src={user.image || 'https://avatar.iran.liara.run/public'} />
        </Avatar.Root>
        <Box>
          <Text fontWeight='semibold'>{user.name}</Text>
          <Box
            fontSize={'sm'}
            color={'gray.500'}
          >
            <Link
              target='_blank'
              href={`/post/${comment.post.slug}`}
            >
              <Text lineClamp={1}>on {comment.post.title}</Text>
            </Link>
            <Text fontSize={'xs'}>
              {dayjs(createdAt).format('MMM D, YYYY h:mm A')}
            </Text>
          </Box>
        </Box>
      </HStack>

      <Text
        mb={4}
        whiteSpace='pre-wrap'
        lineClamp={2}
      >
        {content}
      </Text>

      {!isDashboardMainPage && (
        <Flex justify='flex-start'>
          <IconButton
            title='Delete'
            colorPalette={'red'}
            opacity={0.6}
          >
            <DeleteOutlined />
          </IconButton>
        </Flex>
      )}
    </VStack>
  );
}
