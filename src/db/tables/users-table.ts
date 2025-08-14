import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sessionsTable } from "./sessions-table";
import { accountsTable } from "./accounts-table";


export const userRoleEnum = pgEnum("userRole", ['ADMIN', 'USER', 'GUEST']);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  role: userRoleEnum("role").notNull().default('GUEST'),
  createdAt: timestamp("created_at").defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
    .notNull(),
});


export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  accounts: many(accountsTable)
}));
