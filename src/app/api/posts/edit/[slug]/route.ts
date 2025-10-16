import { db } from '@/db';
import { NextRequest } from 'next/server';
import { post } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const session = await auth();
    const authorId = session?.user?.id;

    if (!authorId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const foundPost = await db.query.post.findFirst({
      where: eq(post.slug, slug),

      with: {
        category: true,
        asset: true,
      },
    });

    if (!foundPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json(foundPost);
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
