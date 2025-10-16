'use client';

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { Button, Menu, Portal } from '@chakra-ui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const orderBy = [
  { label: 'Descending', value: 'decs' },
  { label: 'Ascending', value: 'asc' },
];

export default function OrderBy() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          p={4}
          colorPalette={'teal'}
          outline={'none'}
        >
          {searchParams.get('orderBy') === 'asc' ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
          Order
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content p={2}>
            <Menu.RadioItemGroup
              onValueChange={(event) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('orderBy', event.value);
                router.push(`${pathname}?${params}`);
              }}
            >
              {orderBy.map((item) => (
                <Menu.RadioItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
