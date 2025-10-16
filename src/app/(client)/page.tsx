import Featured from '@/components/client/Featured/Featured';
import PostList from '@/components/client/PostList/PostList';
import CategoryList from '@/components/client/Category/CategoryList';

export default async function Home() {

  return (
    <>
      <Featured />
      <CategoryList title='Browse by category' />
      <PostList category='all' />
    </>
  );
}
