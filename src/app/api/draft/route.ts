import { db } from '@/db';
import { draft, post } from '@/db/schema';
import { NewPost } from '@/db/schema/post';
import { auth } from '@/lib/auth';
import { getUserDrafts } from '@/utils/server-utils';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const drafts = await getUserDrafts(userId);
    return Response.json({ drafts });
  } catch (error) {
    console.error('Error fetching drafts:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: NewPost & { draftToken: string } = await request.json();
    const { draftToken: token, ...restBody } = body;

    const session = await auth();
    const userId = session?.user?.id;
    // const userId = '2341c4bf-9d03-49e8-9138-14aadde33f9f';

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const foundDraft = await db.query.draft.findFirst({
      where: eq(draft.draftToken, token),
    });

    let draftRecord;
    let postRecord;

    if (!foundDraft) {
      [postRecord] = await db
        .insert(post)
        .values({
          ...restBody,
          authorId: userId,
          isDraft: true,
        })
        .returning();

      [draftRecord] = await db
        .insert(draft)
        .values({
          postId: postRecord.id,
          userId,
          draftToken: token,
          title: restBody.title || 'Untitled',

        })
        .returning();
    } else {
      draftRecord = foundDraft;
      draftRecord.updatedAt = new Date();

      [postRecord] = await db
        .update(post)
        .set({
          ...restBody,
          updatedAt: new Date(),
        })
        .where(eq(post.id, foundDraft.postId))
        .returning();
    }

    return Response.json({ draft: draftRecord, post: postRecord });
  } catch (error) {
    console.error('Error creating draft:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
