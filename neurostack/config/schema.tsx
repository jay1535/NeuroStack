import {
  date,
  integer,
  json,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(10),
});

/* ================= PROJECT ================= */

export const ProjectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // Public project identifier (used in URLs)
  projectId: varchar({ length: 255 })
    .notNull()
    .unique(), // ✅ REQUIRED for FK

  projectName: varchar({ length: 255 }),

  userInput: varchar(),

  device: varchar(),

  createdOn: date().defaultNow(),

  config: json(),

  theme: varchar(),
  projectVisualDescription:text(),

  // FK → users.email (email is UNIQUE)
  userId: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.email, {
      onDelete: "cascade",
    }),
});

/* ================= SCREEN CONFIG ================= */

export const ScreenConfig = pgTable("screenConfig", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // FK → project.projectId (VALID because projectId is UNIQUE)
  projectId: varchar({ length: 255 })
    .notNull()
    .references(() => ProjectTable.projectId, {
      onDelete: "cascade",
    }),

  screenId: varchar({ length: 255 }),

  screenName: varchar({ length: 255 }),

  purpose: varchar(),

  screenDescription: varchar(),

  code: text(),
});
