import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

export const todoTable = pgTable('todos', {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
});

export const db = drizzle(sql);

export type Todo = {
  id: number;
  task: string;
};
