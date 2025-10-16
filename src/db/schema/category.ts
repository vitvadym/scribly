import { pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { post } from "./post";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const category = pgTable("categories", {
  id: serial("id").primaryKey().notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  label: varchar("label", { length: 255 }).notNull(),
  color: varchar("color", { length: 255 }).notNull(),
});

export const categoryRelation = relations(category, ({ many }) => ({
  posts: many(post),
}));

export type Category = InferSelectModel<typeof category>;
export type NewCategory = InferInsertModel<typeof category>;