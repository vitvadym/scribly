'use client';

import { SearchOutlined } from '@ant-design/icons';
import { InputGroup, Input } from '@chakra-ui/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  useEffect(() => {
    const search = searchParams.get('search');
    const params = new URLSearchParams(searchParams.toString());
    if (!search) {
      params.delete('search');
      setSearchQuery('');
      router.push(`${pathname}?${params}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <InputGroup
      startElementProps={{ ml: 4 }}
      width={'250px'}
      startElement={<SearchOutlined />}
    >
      <Input
        value={searchQuery}
        onChange={(event) => {
          const params = new URLSearchParams(searchParams.toString());
          setSearchQuery(event.target.value);
          params.set('search', event.target.value);
          router.push(`${pathname}?${params}`);
        }}
        placeholder='Type to search...'
      />
    </InputGroup>
  );
}
