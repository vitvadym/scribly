import {
  pgTable,
  integer,
  varchar,
  boolean,
  text,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { category } from './category';
import { InferSelectModel, relations } from 'drizzle-orm';
import { comment } from './comment';
import { user } from './user';
import { z } from 'zod';
import { asset } from './asset';

export const post = pgTable('posts', {
  id: serial('id').primaryKey().notNull(),
  title: varchar('title', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  content: text('content'),
  coverImage: text('cover_image'),
  description: text('description'),
  isDraft: boolean('is_draft').default(false),
  authorId: text('author_id')
    .notNull()
    .references(() => user.id),
  category: varchar('category', { length: 255 }),
  categoryId: integer('category_id')
    .references(() => category.id),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const postRelation = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
  comments: many(comment),
  asset: one(asset, {
    fields: [post.id],
    references: [asset.postId],
  }),
}));

export const postCreateSchema = z.object({
  content: z.string().min(200),
  title: z.string().min(10).max(100),
  coverImage: z.string().startsWith('https://'),
  category: z.string().min(3),
  categoryId: z.number().min(1),
  slug: z.string().min(3),
  description: z.string().min(10),
  assetId: z.string(),
});

export const postUpdateSchema = postCreateSchema.extend({
  id: z.number(),
  assetPublicId: z.string(),
});

export type NewPost = z.infer<typeof postCreateSchema>;
export type UpdatePost = z.infer<typeof postUpdateSchema>;
export type Post = InferSelectModel<typeof post>;
