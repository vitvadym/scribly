import styles from './page.module.css';
import PostSidebar from '@/components/client/PostSidebar/PostSidebar';
import { getPostBySlug } from '@/lib/utils';
import { notFound } from 'next/navigation';
import CommentForm from '@/components/client/Comments/CommentForm';
import CommentsList from '@/components/client/Comments/CommentsList';
import SinglePost from '@/components/client/SinglePost/SinglePost';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.postContainer}>
        <SinglePost slug={slug} />
        <CommentForm postSlug={slug} />
        <CommentsList postSlug={slug} />
      </main>
      <aside className={styles.sideContainer}>
        <PostSidebar />
      </aside>
    </div>
  );
}
