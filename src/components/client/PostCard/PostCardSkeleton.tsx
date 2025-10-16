import styles from './PostCard.module.css';

export default function PostCardSkeleton() {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.image} ${styles.skeleton}`} />
      <div className={styles.content}>
        <div className={`${styles.meta}`}>
          <div className={`${styles.skeleton} ${styles.skeletonPill}`} />
          <div className={`${styles.skeleton} ${styles.skeletonShort}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        <div className={styles.author}>
          <div className={`${styles.avatar} ${styles.skeleton}`} />
          <div className={`${styles.skeleton} ${styles.skeletonName}`} />
        </div>
      </div>
    </div>
  );
}
