'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { LogoutOutlined } from '@ant-design/icons';
import { SidebarItems } from './MenuItems';
import { Button, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.sidebarList}>
          {SidebarItems?.map((item) => (
            <Link
              key={item.label}
              href={item.href}
            >
              <p
                className={cn(styles.sidebarItem, {
                  [styles.active]: item.href === pathname,
                })}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebarFooter}>
        <HStack>
          <Button
            colorPalette='orange'
            p={2}
            variant='solid'
          >
            <LogoutOutlined />
            Logout
          </Button>
        </HStack>
      </div>
    </aside>
  );
}
