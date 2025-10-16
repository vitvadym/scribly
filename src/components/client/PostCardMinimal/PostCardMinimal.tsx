import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './PostCardMin.module.css';
import Button from '@/components/ui/Button/Button';
import { Post } from '@/db/schema/post';
import { fromNow } from '@/utils/client-utils';
import Link from 'next/link';
import { deleteUserPost } from '@/utils/server-utils';

export default async function PostCardMinimal({ post }: { post: Post }) {
  const handleDeletePost = async (formData: FormData) => {
    'use server';
    try {
      const postId = formData.get('postId');

      await deleteUserPost(Number(postId?.toString()));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Link href={`/post/${post.slug}`}>
          <h2 className={styles.title}>{post.title}</h2>
        </Link>
      </div>
      <p className={styles.date}>
        Published: {fromNow(post.createdAt)}
      </p>
      <div className={styles.actions}>
        <form action={handleDeletePost}>
          <input
            type='hidden'
            name='postId'
            value={post.id}
          />
          <Button
            variant='icon'
            type='submit'
          >
            <DeleteOutlined />
          </Button>
        </form>

        <Button variant='icon'>
          <Link href={`/post/${post.slug}/edit`}>
            <EditOutlined />
          </Link>
        </Button>
      </div>
    </div>
  );
}
