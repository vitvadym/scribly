import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { user } from './user';
import { post } from './post';
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const asset = pgTable('assets', {
  id: serial('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  postId: integer('post_id').references(() => post.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  assetId: text('asset_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const assetRelation = relations(asset, ({ one }) => ({
  user: one(user, {
    fields: [asset.userId],
    references: [user.id],
  }),

  post: one(post, {
    fields: [asset.postId],
    references: [post.id],
  }),
}));

export type Asset = InferSelectModel<typeof asset>;
export type AssetInsert = InferInsertModel<typeof asset>;
export type NewAsset = Omit<AssetInsert, 'userId'>;
