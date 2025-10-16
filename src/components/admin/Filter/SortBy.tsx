'use client';

import { FilterOutlined } from '@ant-design/icons';
import { Button, Menu, Portal } from '@chakra-ui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type SortingFields = {
  label: string;
  value: string;
};
export default function SortBy({ fields }: { fields: SortingFields[] }) {
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
          <FilterOutlined /> Sort By
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content p={2}>
            <Menu.RadioItemGroup
              onValueChange={(event) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('sortBy', event.value);
                router.push(`${pathname}?${params}`);
              }}
            >
              {fields?.map((item) => (
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
