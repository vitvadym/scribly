'use client';

import styles from './Featured.module.css';
import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import useEmblaCarousel from 'embla-carousel-react';
import FeaturedPost from './FeaturedPost';
import Button from '../../ui/Button/Button';
import FeaturedPostSkeleton from './FeaturedPostSkeleton';
import { useFeaturedPosts } from '@/hooks/useFeatutedPosts';

export default function Featured() {
  const { featuredPosts, isLoading } = useFeaturedPosts();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  return (
    <div
      ref={emblaRef}
      className={styles.embla}
    >
      <div className={styles.emblaContainer}>
        {isLoading && (
          <div className={styles.emblaSlide}>
            <FeaturedPostSkeleton />
          </div>
        )}
        {featuredPosts?.map((post) => (
          <div
            key={post.id}
            className={styles.emblaSlide}
          >
            <FeaturedPost post={post} />
          </div>
        ))}
      </div>

      <div className={styles.navigation}>
        <Button
          onClick={() => emblaApi?.scrollPrev()}
          variant='icon'
        >
          <TriangleLeftIcon
            height={20}
            width={20}
          />
        </Button>
        <Button
          onClick={() => emblaApi?.scrollNext()}
          variant='icon'
        >
          <TriangleRightIcon
            height={20}
            width={20}
          />
        </Button>
      </div>
    </div>
  );
}
