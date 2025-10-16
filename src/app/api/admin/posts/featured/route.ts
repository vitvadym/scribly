import { db } from '@/db';
import { post } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId } = body;
 
    const currentPost = await db.query.post.findFirst({
      where: eq(post.id, postId),
    });


    if (!currentPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const [featuredPost] = await db
      .update(post)
      .set({
        featured: !currentPost.featured,
      })
      .where(eq(post.id, postId))
      .returning({
        id: post.id,
        featured: post.featured,
      });


    return Response.json(featuredPost);
  } catch (error) {
    console.error('Error setting featured post:', error);
  }
}
