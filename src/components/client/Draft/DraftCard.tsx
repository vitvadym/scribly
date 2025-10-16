// components/DraftCard.tsx
import styles from './Draft.module.css';
import { Draft } from '@/db/schema/draft';
import Button from '@/components/ui/Button/Button';
import { DeleteOutlined } from '@ant-design/icons';
import { fromNow } from '@/lib/fromNow';
import { deleteUserDraft } from '@/utils/server-utils';

export default async function DraftCard({
  draft,
}: {
  draft: Pick<Draft, 'updatedAt' | 'title' | 'id'>;
}) {
  const { updatedAt, title, id } = draft;

  const handleDeleteDraft = async (formData: FormData) => {
    'use server';

    const draftId = formData.get('draftId') as string;

    try {
      await deleteUserDraft(draftId);
      // revalidatePath('/drafts');
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.date}>
          Last edited {fromNow(updatedAt.toISOString())}
        </p>
      </div>
      <div className={styles.actions}>
        <form action={handleDeleteDraft}>
          <input
            type='hidden'
            name='draftId'
            value={id}
          />
          <Button
            variant='icon'
            type='submit'
            // className={`${styles.button} ${styles.edit}`}
          >
            <DeleteOutlined />
          </Button>
        </form>
      </div>
    </div>
  );
}
