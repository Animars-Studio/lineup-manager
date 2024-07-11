import {
  serial,
  timestamp,
  pgTable,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  username: varchar("username"),
  password: varchar("password").notNull(),
  isConfirmed: boolean("isConfirmed").default(false),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
