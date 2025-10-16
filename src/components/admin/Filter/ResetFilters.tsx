'use client';

import { CloseOutlined } from '@ant-design/icons';
import { IconButton } from '@chakra-ui/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function ResetFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    searchParams.toString() && (
      <IconButton
        colorPalette={'red'}
        title='Clear filters'
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete('search');
          params.delete('sortBy');
          params.delete('orderBy');
          router.push(`${pathname}?${params}`);
        }}
      >
        <CloseOutlined />
      </IconButton>
    )
  );
}
