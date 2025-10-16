import {
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Card,
  HStack,
  Box,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { CategoryWithPostsCount } from '@/types';

export default function CategoryCard({
  category,
}: {
  category: CategoryWithPostsCount;
}) {
  const { color, label, value, postsCount } = category;
  return (
    <Card.Root p={4}>
      <Card.Body gap='2'>
        <HStack>
          <Box
            rounded={'full'}
            backgroundColor={color}
            w='3'
            h='3'
          />
          <Text>{label}</Text>
        </HStack>
        <Card.Description
          color={'gray.500'}
          mb={4}
          ml={4}
        >
          /{value}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent='space-between'>
        <HStack
          gap='2'
          color={'gray.500'}
          fontSize={'xs'}
        >
          <FileTextOutlined />
          {postsCount} posts
        </HStack>

        <IconButton size={'xs'} colorPalette={'red'}>
          <DeleteOutlined />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
}
