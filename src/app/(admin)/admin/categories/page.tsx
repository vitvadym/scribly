'use client';
import CategoryCard from '@/components/admin/CategoryCard/CategoryCard';
import OrderBy from '@/components/admin/Filter/OrderBy';
import ResetFilters from '@/components/admin/Filter/ResetFilters';
import SearchInput from '@/components/admin/SearchInput/SearchInput';
import { useCategories } from '@/hooks/useCategories';
import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  VStack,
  Spinner,
  Button,
  Flex,
  CloseButton,
  Portal,
  parseColor,
  Drawer,
  Stack,
  Input,
  Text,
} from '@chakra-ui/react';
import {  useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDisclosure } from '@chakra-ui/react';

export default function Categories() {
  const { open, setOpen } = useDisclosure();
  const [color, setColor] = useState('#aabbcc');
  const [categoryName, setCategoryName] = useState('');
  const { categories, isLoading} = useCategories();

  if (isLoading) {
    return (
      <Center h={'2/3'}>
        <Spinner
          borderWidth={4}
          color={'teal.500'}
          size={'lg'}
        />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <VStack gap={8}>
        <Box
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Heading size='2xl'>Categories</Heading>
        </Box>

        <HStack
          justifyContent={'space-between'}
          width={'100%'}
          mb={6}
        >
          <Flex gap={4}>
            <SearchInput />
            <OrderBy />
            <ResetFilters />
          </Flex>
          <Drawer.Root open={open}>
            {/* <Drawer.Trigger asChild> */}
            <Button
              onClick={() => setOpen(true)}
              p={4}
              colorPalette={'teal'}
            >
              Add Category
            </Button>
            {/* </Drawer.Trigger> */}
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content p={4}>
                  <Drawer.Header>
                    <Drawer.Title>New Category</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Stack
                      mt='5'
                      gap={4}
                    >
                      <Box>
                        <Text mb={1}>Category Name</Text>
                        <Input
                          required
                          placeholder='sport, food, etc'
                          p={3}
                          outline={'none'}
                          value={categoryName}
                          onChange={(event) => {
                            const value = event.target.value;
                            setCategoryName(value.trim());
                          }}
                        />
                      </Box>
                      <Box>
                        <Text mb={1}>Category Color</Text>
                        <HexColorPicker
                          color={color}
                          onMouseUp={() => {
                            const pointer = document.querySelector(
                              '.react-colorful__pointer-fill',
                            );

                            if (pointer) {
                              const bg =
                                getComputedStyle(pointer).backgroundColor;
                              const parsedBg = parseColor(bg).toString('hex');
                              setColor(parsedBg);
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Button
                      onClick={() => setOpen(false)}
                      p={4}
                      variant='outline'
                    >
                      Cancel
                    </Button>
                    <Button p={4}>Save</Button>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton
                      onClick={() => setOpen(false)}
                      size='sm'
                    />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </HStack>
      </VStack>

      <Grid
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
        gap={4}
      >
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </Grid>
    </Box>
  );
}
