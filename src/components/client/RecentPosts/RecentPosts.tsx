import styles from './RecentPosts.module.css';
import PostPreview from '../PostPreview/PostPreview';
import { getRecentPosts } from '@/utils/server-utils';
export default async function RecentPosts() {
  const posts = await getRecentPosts(5);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Posts</h3>
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
