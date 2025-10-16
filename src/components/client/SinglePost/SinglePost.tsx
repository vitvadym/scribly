import styles from './SinglePost.module.css';
import Image from 'next/image';
import CategoryItem from '../Category/Category';
import { formatDate } from '@/utils/client-utils';
import { getSinglePost } from '@/utils/server/posts';
export default async function SinglePost({ slug }: { slug: string }) {
  const post = await getSinglePost(slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article className={styles.post}>
      <div
        dangerouslySetInnerHTML={{ __html: post.content! }}
        className={styles.content}
      />
      <div className={styles.meta}>
        <Image
          src={
            post.author.image ||
            `https://avatar.iran.liara.run/username?username=${[
              post.author.name,
            ]}`
          }
          alt={post.author.name!}
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
        />
        <p>{post.author.name}</p> • <p>{formatDate(post.createdAt)}</p> •{' '}
        <CategoryItem category={post.category} />
      </div>
    </article>
  );
}
