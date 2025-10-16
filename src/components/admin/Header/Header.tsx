import { Avatar, Box, HStack, Input, InputGroup, Text } from '@chakra-ui/react';
import { headerProps } from './styles'
import { SearchOutlined } from '@ant-design/icons';

export default function Header() {
  return (
    <Box {...headerProps}>
      <InputGroup
        w={'250px'}
        startElementProps={{ ml: 4 }}
        startElement={<SearchOutlined />}
      >
        <Input placeholder='Search...' />
      </InputGroup>

      <HStack gap={4}>
        <Avatar.Root>
          <Avatar.Fallback>JD</Avatar.Fallback>
          <Avatar.Image src='https://avatar.iran.liara.run/public' />
        </Avatar.Root>

        <Text>John Doe</Text>
      </HStack>
    </Box>
  );
}
