import { ADMIN_ROUTES } from '@/constansts/constants';
import {
  TagOutlined,
  DashboardOutlined,
  CommentOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

interface ISidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const SidebarItems: ISidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    href: ADMIN_ROUTES.DASHBOARD,
  },

  {
    label: 'Posts',
    icon: <FileTextOutlined />,
    href: ADMIN_ROUTES.POSTS,
  },
  {
    label: 'Comments',
    icon: <CommentOutlined />,
    href: ADMIN_ROUTES.COMMENTS,
  },
  {
    label: 'Users',
    icon: <UserOutlined />,
    href: ADMIN_ROUTES.USERS,
  },
  {
    label: 'Categories',
    icon: <TagOutlined />,
    href: ADMIN_ROUTES.CATEGORIES,
  },
];
