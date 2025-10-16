import {
  CommentOutlined,
  FileOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { HStack, Icon, Stat, type StatRootProps } from '@chakra-ui/react';
export interface StatCardProps extends StatRootProps {
  variant?: 'default' | 'users' | 'posts' | 'comments';
  label: string;
  value: number;
}

const variantIcon = (variant: string) => {
  switch (variant) {
    case 'users':
      return <UserOutlined />;

    case 'posts':
      return <FileOutlined />;

    case 'comments':
      return <CommentOutlined />;

    default:
      return <BarChartOutlined />;
  }
};

export default function StatCard({
  variant = 'default',
  label,
  value,
  ...props
}: StatCardProps) {
  return (
    <Stat.Root
      // maxW='240px'
      borderWidth='1px'
      p='4'
      rounded='md'
      {...props}
    >
      <HStack justify='space-between'>
        <Stat.Label>{label}</Stat.Label>
        <Icon color='fg.muted'>{variantIcon(variant)}</Icon>
      </HStack>
      <Stat.ValueText>{value}</Stat.ValueText>
    </Stat.Root>
  );
}
