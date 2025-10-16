import Button from '../Button/Button';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './LoadMore.module.css';

export default function LoadMore({
  hasMore,
  loadMore,
  isLoading,
}: {
  hasMore: boolean | undefined;
  loadMore: () => void;
  isLoading: boolean;
}) {
  return (
    <div className={styles.container}>
      <Button
        fixedWidth
        variant='outline'
        disabled={!hasMore}
        onClick={loadMore}
      >
        {isLoading ? <ReloadOutlined spin /> : 'Load More'}
      </Button>
    </div>
  );
}
