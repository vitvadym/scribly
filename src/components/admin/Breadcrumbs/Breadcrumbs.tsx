'use client';
import { Breadcrumb, Icon } from '@chakra-ui/react';
import { RightOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/lib/capitalize';

export default function Breadcrumbs() {
  const paths = usePathname().split('/').slice(1);
  const currentPath = paths[paths.length - 1];

  return (
    <Breadcrumb.Root p={4}>
      <Breadcrumb.List>
        {paths.map((path) => (
          <Breadcrumb.Item
            key={path}
            fontSize='md'
          >
            {path === currentPath ? (
              <Breadcrumb.CurrentLink>
                {path === 'admin' ? <HomeOutlined /> : capitalize(path)}
              </Breadcrumb.CurrentLink>
            ) : (
              <>
                <Link href={`/${path}`}>{capitalize(path)}</Link>
                <Icon
                  ml={2}
                  color={'fg.muted'}
                >
                  <RightOutlined />
                </Icon>
              </>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
