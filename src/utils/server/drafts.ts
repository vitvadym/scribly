import { db } from '@/db';
import { post, draft } from '@/db/schema';
import { eq} from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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
