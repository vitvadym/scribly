import React from 'react';
import styles from './PostSidebar.module.css';
import RecentPosts from '../RecentPosts/RecentPosts';
import CategoryList from '../Category/CategoryList';

export default function PostSidebar() {
  return (
    <div className={styles.sidebar}>
      <RecentPosts />
      <CategoryList aside />
      {/* <PostActions /> */}
    </div>
  );
}
