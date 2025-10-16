import { Asset } from '@/db/schema/asset';
import { Category } from '@/db/schema/category';
import { Comment } from '@/db/schema/comment';
import { Post } from '@/db/schema/post';
import { User } from '@/db/schema/user';

export type PostWithAuthor = Post & {
  author: Pick<User, 'name' | 'image'>;
  category: Category;
};

export type PostWithCategory = Post & {
  category: Category;
};

export type CommentWithAuthor = Comment & {
  user: Pick<User, 'name' | 'image'>;
  post: Pick<Post, 'slug' | 'title'>;
};

export type PostWithAsset = Post & {
  asset: Asset;
};

export type CategoryWithPostsCount = Category & {
  postsCount: number;
};
