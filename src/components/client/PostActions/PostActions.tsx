'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Button from '../../ui/Button/Button';
import styles from './PostActions.module.css';
import {
  TrashIcon,
  StarIcon,
  Pencil1Icon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

export default function PostActions() {
  const { slug } = useParams();
  const [featured, setFeatured] = useState(false);
  const [isAdmin] = useState(true);

  const handleSetFeatured = () => {
    setFeatured((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <Button icon={TrashIcon}>Delete Post</Button>

      {isAdmin && (
        <Button
          icon={featured ? StarFilledIcon : StarIcon}
          onClick={handleSetFeatured}
        >
          Featured
        </Button>
      )}

      <Button icon={Pencil1Icon}>
        <Link href={`/edit/${slug}`}>Edit</Link>
      </Button>
    </div>
  );
}
