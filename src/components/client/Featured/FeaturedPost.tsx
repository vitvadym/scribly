import Image from 'next/image';
import styles from './Featured.module.css';
import Button from '../../ui/Button/Button';
import { Post } from '@/db/schema/post';
import Link from 'next/link';
export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className={styles.post}>
      <div className={styles.imgContainer}>
        <Image
          src={post.coverImage || 'https://placehold.co/800x600'}
          alt='post image'
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDesc}>{post.description}</p>
        <Button>
          <Link href={`/post/${post.slug}`}>Read More</Link>
        </Button>
      </div>
    </div>
  );
}
