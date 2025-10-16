import { getPostComments } from '@/utils/server-utils';
import Comment from './Comment';
import styles from './Comments.module.css';

export default async function CommentsList({ postSlug }: { postSlug: string }) {
  const data = await getPostComments(postSlug);

  if (!data?.comments.length) {
    return <p>No comments yet</p>;
  }
  return (
    <div className={styles.commentsSection}>
      {data.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}
