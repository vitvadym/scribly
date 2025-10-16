import styles from './Category.module.css';
import Link from 'next/link';
import cn from 'classnames';
import { Category } from '@/db/schema/category';

type CategoryProps = {
  category: Category | null;
  isBadge?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function CategoryItem({
  category,
  isBadge = false,
  ...props
}: CategoryProps) {
  return (
    <span
      className={cn(styles.category, { [styles.isBadge]: isBadge })}
      style={{
        backgroundColor: category?.color,
        color: 'white',
      }}
      {...props}
    >
      <Link href={`/category/${category?.value}`}>{category?.label}</Link>
    </span>
  );
}
