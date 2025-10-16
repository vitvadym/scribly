import Image from 'next/image';
import styles from './PostPreview.module.css';
import Link from 'next/link';
import { Post } from '@/db/schema/post';
import { formatDate } from '@/utils/client-utils';

export default function PostPreview({
  post,
}: {
  post: Post & { author: { name: string | null } };
}) {
  const { coverImage, title, author, createdAt } = post;
  return (
    <Link
      href={`/post/${post.slug}`}
      className={styles.postPreview}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={coverImage || 'https://placehold.co/600x400'}
          alt={'Post title image'}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.author}>{author?.name}</span>
          <span className={styles.date}>{formatDate(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
