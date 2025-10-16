import { NextRequest } from 'next/server';
import { db } from '@/db';
import { post, asset } from '@/db/schema';
import { auth } from '@/lib/auth';
import { getAllPosts } from '@/utils/server-utils';
import { eq } from 'drizzle-orm';
import { NewPost } from '@/db/schema/post';
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

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body: NewPost = await request.json();

    const authorId = session?.user?.id;
    if (!authorId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const {
      category,
      title,
      content,
      coverImage,
      categoryId,
      slug,
      description,
      assetId,
    } = body;

    const [createdPost] = await db
      .insert(post)
      .values({
        category,
        title,
        content,
        coverImage,
        categoryId,
        slug,
        authorId,
        description,
      })
      .returning();

    if (createdPost.id) {
      await db
        .update(post)
        .set({ isDraft: false })
        .where(eq(post.id, createdPost.id));

      await db
        .update(asset)
        .set({ postId: createdPost.id })
        .where(eq(asset.assetId, assetId));
    }

    return Response.json(createdPost);
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
