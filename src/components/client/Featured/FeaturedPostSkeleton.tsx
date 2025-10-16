import styles from './Featured.module.css';

export default function FeaturedPostSkeleton() {
  return (
    <div className={styles.post}>
      <div className={`${styles.imgContainer} ${styles.skeleton}`} />
      <div className={styles.textContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        <div className={`${styles.skeleton} ${styles.skeletonText}`} />
        <div className={`${styles.skeleton} ${styles.skeletonText}`} />
      </div>
    </div>
  );
}
