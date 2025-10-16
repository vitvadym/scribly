'use server';

import { getPostComments } from '@/utils/server-utils';
import { comment as commentShema } from '@/db/schema';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export const createComment = async (formData: FormData) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const commentText = formData.get('comment')?.toString();
  const postSlug = formData.get('slug')?.toString();
  const commentInfo = await getPostComments(postSlug?.toString() as string);

  if (!commentInfo || !commentText) {
    return;
  }

  await db.insert(commentShema).values({
    content: commentText,
    userId,
    postId: commentInfo.postId,
  });

  revalidatePath(`/post/${postSlug}`);
};
