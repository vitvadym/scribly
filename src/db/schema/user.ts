import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { post } from './post';
import { relations, InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { account } from './account';
import { session } from './session';
import { comment } from './comment';
import { asset } from './asset';
import { pgEnum } from 'drizzle-orm/pg-core';

const userRoleEnum = pgEnum('role', ['ADMIN', 'USER']);

export const user = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: userRoleEnum('role').notNull().default('USER'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  bio: text('bio').default(''),
  position: text('position').default(''),
});

export const userRelation = relations(user, ({ many, one }) => ({
  account: one(account, {
    fields: [user.id],
    references: [account.userId],
  }),
  session: one(session, {
    fields: [user.id],
    references: [session.userId],
  }),
  posts: many(post),
  comments: many(comment),
  files: many(asset),
}));

export type User = Omit<InferSelectModel<typeof user>, 'password, id'>;
export type NewUser = InferInsertModel<typeof user>;
