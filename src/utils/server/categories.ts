import { db } from '@/db';
import { post, category } from '@/db/schema';
import { count, eq } from 'drizzle-orm';

export const getCategoriesDashboard = async () => {
  try {
    const { id, label, value, color } = category;
    const postCounts = await db
      .select({
        id,
        label,
        value,
        color,
        postsCount: count(post.id),
      })
      .from(category)
      .leftJoin(post, eq(post.categoryId, category.id))
      .groupBy(category.id)
      .orderBy(category.value);

    return postCounts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await db.query.category.findMany();
    return categories;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
};
