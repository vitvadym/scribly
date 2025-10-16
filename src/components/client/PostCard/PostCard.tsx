import Image from 'next/image';
import styles from './PostCard.module.css';
import Link from 'next/link';
import Category from '../Category/Category';
import dayjs from 'dayjs';
import { PostWithAuthor } from '@/types';

export default function PostCard({ postCard }: { postCard: PostWithAuthor }) {
  if (!postCard) {
    return;
  }

  const {
    author,
    category,
    title,
    slug,
    coverImage,
    createdAt,
    authorId,
    description,
  } = postCard;

  return (
    <article className={styles.card}>
      <Link href={`/post/${slug}`}>
        <Image
          width={500}
          height={300}
          src={coverImage || 'https://placehold.co/800x600'}
          alt={'Post title image'}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <Category
            isBadge
            category={category}
            className={styles.category}
            style={{ backgroundColor: category?.color }}
          >
            {category?.label}
          </Category>
          <time className={styles.date}>
            {dayjs(createdAt).format('MMM D, YYYY')}
          </time>
        </div>

        <h2
          className={styles.title}
        >
          {title}
        </h2>
        <p className={styles.description}>{description}</p>

        <Link href={`/authors/${authorId}`}>
          <div className={styles.author}>
            <Image
              width={50}
              height={50}
              src={author.image || 'https://avatar.iran.liara.run/public'}
              alt={author.name || 'Author name'}
              className={styles.avatar}
            />
            <span>{author.name}</span>
          </div>
        </Link>

        <Link
          href={`/post/${slug}`}
          className={styles.readMore}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
