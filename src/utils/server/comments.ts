import { db } from '@/db';
import { post, comment } from '@/db/schema';
import { CommentWithAuthor } from '@/types';
import { desc, eq, count, sql, or, asc } from 'drizzle-orm';

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

// admin actions

export const getRecentComments = async (limit: number) => {
  try {
    const comments = await db.query.comment.findMany({
      orderBy: desc(comment.createdAt),
      limit,
    });

    return comments;
  } catch (error) {
    console.error('Error fetching recent comments:', error);
    return null;
  }
};

export const getAllComments = async ({
  page,
  limit,
  order = 'asc',
  searchQuery = '',
}: {
  page: number;
  limit: number;
  order: string;
  searchQuery: string;
}): Promise<{ comments: CommentWithAuthor[]; hasMore: boolean }> => {
  try {
    const offset = (page - 1) * limit;
    const searchCondition = searchQuery
      ? or(
          sql`(
          setweight(to_tsvector('english', ${comment.content}), 'A'))
          @@ to_tsquery('english', ${searchQuery}
        )`,
        )
      : undefined;

    const orderBy =
      order === 'asc' ? asc(comment.createdAt) : desc(comment.createdAt);

    const comments = await db.query.comment.findMany({
      where: searchCondition,
      with: {
        user: {
          columns: {
            name: true,
            image: true,
          },
        },
        post: {
          columns: {
            title: true,
            slug: true,
          },
        },
      },
      limit,
      offset,
      orderBy,
    });

    const commentsCount = await db
      .select({
        count: count(comment.id),
      })
      .from(comment);

    const hasMore = offset + limit < commentsCount[0].count;

    return { comments, hasMore };
  } catch (error) {
    console.error('Error fetching all comments:', error);
    return { comments: [], hasMore: false };
  }
};
