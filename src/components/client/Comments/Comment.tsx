import styles from './Comments.module.css';
import Image from 'next/image';
import { CommentWithAuthor } from '@/types';
import { formatDate } from '@/utils/client-utils';

export default function Comment({ comment }: { comment: CommentWithAuthor }) {
  const { user, content, createdAt } = comment;

  return (
    <div
      key={comment.id}
      className={styles.comment}
    >
      <div className={styles.commentMeta}>
        <Image
          src={
            user.image || 'https://avatar.iran.liara.run/public'
          }
          alt={user.name!}
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
        <p>{user.name}</p>
        <p>{formatDate(createdAt)}</p>
      </div>
      <p>{content}</p>
    </div>
  );
}
