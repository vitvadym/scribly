import { NextRequest } from 'next/server';
import { getAllPosts } from '@/utils/server-utils';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { post } from '@/db/schema';

export async function GET(requst: NextRequest) {
  try {
    const searchParams = requst.nextUrl.searchParams;
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '2');
    const category = searchParams.get('category');
    const order = searchParams.get('orderBy');
    const sortBy = searchParams.get('sortBy');
    const searchQuery = searchParams.get('search');

    const { posts, hasMore } = await getAllPosts({
      page,
      limit,
      category: category as string,
      order: order as string,
      sortBy: sortBy as string,
      searchQuery: searchQuery as string,
    });

    return Response.json({ data: posts, hasMore });
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { postId } = await req.json();

    const existingPost = await db.query.post.findFirst({
      where: eq(post.id, postId),
    });

    if (!existingPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const deletedPost = await db
      .delete(post)
      .where(eq(post.id, postId))
      .returning({
        id: post.id,
      });

    return Response.json(deletedPost);
  } catch (error) {
    console.log('Error deleting post', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
