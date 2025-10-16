import { db } from '@/db';
import { post, asset as assetTable } from '@/db/schema';
import { UpdatePost } from '@/db/schema/post';
import { auth } from '@/lib/auth';
import { PostWithAsset } from '@/types';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

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
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
    });

    // const foundUpload = await db.query.upload.findFirst({
    //   where: eq(upload.userId, authorId),
    // });

    if (!foundPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json(foundPost);
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const authorId = session?.user?.id;

    if (!authorId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: PostWithAsset = await request.json();

    const { category, title, content, categoryId, slug, description, asset } =
      body;

    const [createdPost] = await db
      .insert(post)
      .values({
        category,
        title,
        content,
        coverImage: asset?.url,
        categoryId,
        slug,
        description,
        authorId,
        isDraft: false,
      })
      .returning();

    if (createdPost.id) {
      await db
        .update(assetTable)
        .set({ postId: createdPost.id })
        .where(eq(assetTable.publicId, asset.publicId));
    }

    return Response.json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdatePost = await request.json();

    const {
      category,
      title,
      content,
      categoryId,
      slug,
      description,
      coverImage,
      id,
      assetPublicId,
    } = body;

    console.log('body', body);

    const [updatedPost] = await db
      .update(post)
      .set({
        category,
        title,
        content,
        coverImage,
        categoryId,
        slug,
        description,
        updatedAt: new Date(),
      })
      .where(eq(post.id, id))
      .returning();

    console.log('updatedPostId', updatedPost);

    if (updatedPost.id) {
      await db
        .update(assetTable)
        .set({ postId: updatedPost.id })
        .where(eq(assetTable.publicId, assetPublicId));
    }

    return Response.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
