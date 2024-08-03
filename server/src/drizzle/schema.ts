import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  varchar,
  integer,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").notNull().default(""),
  username: varchar("username"),
  password: varchar("password").notNull().default(""),
  isConfirmed: boolean("isConfirmed").default(false),
  firstName: varchar("firstName").notNull().default(""),
  lastName: varchar("lastName").notNull().default(""),
  dateOfBirth: varchar("dateOfBirth").notNull().default(""),
  country: varchar("country").notNull().default(""),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

// relations for the users table
export const usersRelations = relations(usersTable, ({ one, many }) => ({
  teams: many(teamsTable),
  positions: many(positionsTable),
}));

export const teamsTable = pgTable("teams", {
  id: varchar("id").primaryKey().notNull(),
  name: varchar("name").notNull().default(""),
  country: varchar("country").notNull().default(""),
  logoUrl: varchar("logoUrl").default(""),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

// relations for the teams table
export const teamRelations = relations(teamsTable, ({ one, many }) => ({
  users: many(usersTable),
}));

export const positionsTable = pgTable("positions", {
  id: varchar("id").primaryKey().notNull(),
  abbreviation: varchar("abbreviation").notNull().default(""),
  longName: varchar("longName").notNull().default(""),
  fieldIdentifier: integer("fieldIdentifier").notNull().default(0),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

// relations for the positions table
export const positionRelations = relations(positionsTable, ({ one, many }) => ({
  users: many(usersTable),
}));

// junction table for many-to-many relationship between users and teams
export const userTeamsTable = pgTable(
  "user_teams",
  {
    userId: varchar("userId")
      .notNull()
      .references(() => usersTable.id),
    teamId: varchar("teamId")
      .notNull()
      .references(() => teamsTable.id),
    role: varchar("role").notNull().default(""),
  },
  (junctionTable) => ({
    pk: primaryKey({
      columns: [junctionTable.userId, junctionTable.teamId],
    }),
  })
);

// junction table for many-to-many relationship between users and positions
export const userPositionsTable = pgTable(
  "user_positions",
  {
    userId: varchar("userId")
      .notNull()
      .references(() => usersTable.id),
    positionId: varchar("positionId")
      .notNull()
      .references(() => positionsTable.id),
  },
  (junctionTable) => ({
    pk: primaryKey({
      columns: [junctionTable.userId, junctionTable.positionId],
    }),
  })
);

// relations for users positions table
export const userPositionsRelations = relations(
  userPositionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userPositionsTable.userId],
      references: [usersTable.id],
    }),
    position: one(positionsTable, {
      fields: [userPositionsTable.positionId],
      references: [positionsTable.id],
    }),
  })
);
