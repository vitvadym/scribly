import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { post } from './post';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { user } from './user';

export const draft = pgTable('drafts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title'),
  postId: integer('post_id')
    .notNull()
    .references(() => post.id, {
      onDelete: 'cascade',
    }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  draftToken: text('draft_token'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const draftRelation = relations(draft, ({ one }) => ({
  post: one(post, {
    fields: [draft.postId],
    references: [post.id],
  }),

  user: one(user, {
    fields: [draft.userId],
    references: [user.id],
  }),
}));

export type Draft = InferSelectModel<typeof draft>;
export type NewDraft = InferInsertModel<typeof draft>;
