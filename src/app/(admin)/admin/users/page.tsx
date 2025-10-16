// 'use client';

import OrderBy from '@/components/admin/Filter/OrderBy';
import ResetFilters from '@/components/admin/Filter/ResetFilters';
import SearchInput from '@/components/admin/SearchInput/SearchInput';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import UserCard from '@/components/admin/UserCard/UserCard';
import { db } from '@/db';

// const sortBy = [
//   { label: 'Name', value: 'name' },
//   { label: 'Date', value: 'date' },
// ];


export default async function Users() {
  const users = await db.query.user.findMany({ columns: { password: false } });

  return (
    <Box p={4}>
      <VStack gap={8}>
        <HStack
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Heading size='2xl'>Users</Heading>
          <Link href={'#'}></Link>
        </HStack>

        <HStack
          justifyContent={'flex-start'}
          width={'100%'}
          mb={6}
        >
          <SearchInput />
          {/* <SortBy fields={sortBy} /> */}
          <OrderBy />
          <ResetFilters />
        </HStack>
      </VStack>

      <Box>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </Box>
    </Box>
  );
}
