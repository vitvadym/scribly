import {
  pgTable,
  varchar,
  serial,
  timestamp,
  integer,
  text,
} from 'drizzle-orm/pg-core';
import { post } from './post';
import { InferSelectModel, relations } from 'drizzle-orm';
import { user } from './user';

export const comment = pgTable('comments', {
  id: serial('id').primaryKey().notNull(),
  content: varchar('content', { length: 500 }).notNull(),
  postId: integer('post_id')
    .notNull()
    .references(() => post.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const commentRelation = relations(comment, ({ one }) => ({
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),

  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
}));

export type Comment = InferSelectModel<typeof comment>;
export type NewComment = InferSelectModel<typeof comment>;
