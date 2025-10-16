import { db } from '@/db';
import { post, comment, draft } from '@/db/schema';
import { Post } from '@/db/schema/post';
import { CommentWithAuthor } from '@/types';
import {
  desc,
  asc,
  eq,
  count,
  and,
  type AnyColumn,
  sql,
  or,
} from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const getAllPosts = async ({
  page,
  limit,
  category,
  order = 'asc',
  sortBy = 'date',
  searchQuery = '',
}: {
  page: number;
  limit: number;
  category: string;
  order: string;
  sortBy: string;
  searchQuery: string;
}): Promise<{ posts: Post[]; hasMore: boolean }> => {
  const offset = (page - 1) * limit;
  const categoryCondition =
    category === 'all' ? undefined : eq(post.category, category);

  const baseCondition = eq(post.isDraft, false);

  const whereClause = categoryCondition
    ? and(baseCondition, categoryCondition)
    : baseCondition;

  const sortByOptions: Record<string, AnyColumn> = {
    date: post.createdAt,
    title: post.title,
  };

  const orderBy =
    order === 'asc' ? asc(sortByOptions[sortBy]) : desc(sortByOptions[sortBy]);

  const searchCondition = or(
    sql`(
      setweight(to_tsvector('english', ${post.title}), 'A') ||
      setweight(to_tsvector('english', ${post.description}), 'B'))
      @@ to_tsquery('english', ${searchQuery}
    )`,
  );

  const combinedCondition = searchQuery
    ? and(whereClause, searchCondition)
    : whereClause;

  try {
    const posts = await db.query.post.findMany({
      where: combinedCondition,
      limit,
      offset,
      orderBy,
      with: {
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
        category: true,
      },
    });

    const postsCount = await db
      .select({
        count: count(),
      })
      .from(post)
      .where(whereClause);

    const hasMore = offset + limit < postsCount[0].count;

    return {
      posts,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return {
      posts: [],
      hasMore: false,
    };
  }
};

export const getFeaturedPosts = async () => {
  try {
    const posts = await db.query.post.findMany({
      where: eq(post.featured, true),
    });
    return posts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

export const getRecentPosts = async (amount: number) => {
  try {
    const posts = await db.query.post.findMany({
      orderBy: desc(post.createdAt),
      limit: amount,
      with: {
        author: {
          columns: {
            name: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};

export const getPostComments = async (
  slug: string,
): Promise<{ comments: CommentWithAuthor[]; postId: number } | null> => {
  try {
    const currentPost = await db.query.post.findFirst({
      where: eq(post.slug, slug),
    });

    if (!currentPost) {
      return null;
    }

    const comments = await db.query.comment.findMany({
      where: eq(comment.postId, currentPost.id),
      with: {
        user: {
          columns: {
            name: true,
            image: true,
          },
        },
        post: true,
      },
    });

    return { comments, postId: currentPost.id };
  } catch (error) {
    console.error('Error fetching post comments:', error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const categories = await db.query.category.findMany();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getPostsByCategory = async (category: string) => {
  try {
    const posts = await db.query.post.findMany({
      where: eq(post.category, category),
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
};

export const getUserDrafts = async (userId: string) => {
  try {
    const drafts = await db.query.draft.findMany({
      where: eq(draft.userId, userId),
    });

    return drafts;
  } catch (error) {
    console.error('Error fetching user drafts:', error);
    return [];
  }
};

export const deleteUserDraft = async (draftId: string) => {
  try {
    const [responseDraft] = await db
      .delete(draft)
      .where(eq(draft.id, draftId))
      .returning();

    if (responseDraft.id) {
      await db.delete(post).where(eq(post.id, responseDraft.postId));
      revalidatePath('/drafts');
    }

    return responseDraft ? responseDraft.id : null;
  } catch (error) {
    console.error('Error deleting user draft:', error);
    throw new Error('Failed to delete user draft');
  }
};

export const deleteUserPost = async (postId: number) => {
  try {
    const [responsePost] = await db
      .delete(post)
      .where(eq(post.id, postId))
      .returning();


    if (responsePost.id) {
      revalidatePath('/profile');
    }

    return responsePost ? responsePost.id : null;
  } catch (error) {
    console.error('Error deleting user post:', error);
    throw new Error('Failed to delete user post');
  }
};

export const getUserPublishedPosts = async (userId: string) => {
  try {
    const posts = await db.query.post.findMany({
      where: and(eq(post.authorId, userId), eq(post.isDraft, false)),
    });
    return posts;
  } catch (error) {
    console.error('Error fetching user published posts:', error);
    return null;
  }
};
