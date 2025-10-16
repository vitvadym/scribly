import Image from 'next/image';
import styles from './AuthorPreview.module.css';

export default function AuthorPreview() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          fill
          src='https://i.pravatar.cc/300'
          alt='Author'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>John Doe</h2>
        <p className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </p>
      <p>View</p>
      </div>
    </div>
  );
}
