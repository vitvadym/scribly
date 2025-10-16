'use client';

import { HStack, Image, Text, Badge, Box } from '@chakra-ui/react';
import {
  MailOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { User } from '@/db/schema/user';
import { formatDate } from '@/utils/client-utils';

export default function UserCard({ user }: { user: Partial<User> }) {
  const { name, email, image, position, role, createdAt } = user;
  return (
    <HStack
      w={'full'}
      justify={'space-between'}
      p={2}
      shadow={'md'}
    >
      <HStack
        gap={4}
        w={'400px'}
      >
        <Image
          borderRadius='full'
          boxSize='50px'
          src={image || 'https://avatar.iran.liara.run/public'}
          alt={'avatar'}
        />
        <Box>
          <Text>{name}</Text>
          <Text
            color={'gray.500'}
            fontSize={'sm'}
          >
            <MailOutlined /> {email}
          </Text>
        </Box>
      </HStack>
      <Text
        fontSize={'sm'}
        color={'gray.500'}
        w={'300px'}
      >
        <UserOutlined /> {position || 'N/A'}
      </Text>
      <Badge
        size={'md'}
        rounded={'xl'}
        px={4}
      >
        {role}
      </Badge>
      <Text
        fontSize={'md'}
        color={'gray.500'}
        w={'300px'}
        textAlign={'right'}
      >
        <CalendarOutlined /> { createdAt ? formatDate(createdAt) : 'N/A'}
      </Text>
    </HStack>
  );
}
