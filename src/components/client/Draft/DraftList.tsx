import DraftCard from './DraftCard';
import { auth } from '@/lib/auth';
import { getUserDrafts } from '@/utils/server-utils';
import styles from './Draft.module.css';

export default async function DraftList() {
  const session = await auth();
  if (!session || !session.user) return;

  const userId = session.user?.id;
  const drafts = await getUserDrafts(userId);

  if (!drafts.length) {
    return <div>No saved drafts</div>;
  }
  return (
    <div className={styles.container}>
      {drafts.map((draft) => (
        <DraftCard
          key={draft.id}
          draft={draft}
        />
      ))}
    </div>
  );
}
