// 'use client';
import CategoryItem from './Category';
import styles from './Category.module.css';
import cn from 'classnames';
import { getCategories } from '@/utils/server-utils';

type CategoryListProps = {
  title?: string;
  aside?: boolean;
};
export default async function CategoryList({
  title,
  aside = false,
}: CategoryListProps) {
  const categories = await getCategories();
  return (
    <div className={cn({ [styles.aside]: aside })}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.container}>
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
