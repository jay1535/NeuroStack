import {
  date,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */

// config/schema.ts


export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  credits: integer("credits").notNull().default(10),
});


/* ================= PROJECT ================= */

export const ProjectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  projectId: varchar({ length: 255 }).notNull().unique(),

  projectName: varchar({ length: 255 }),

  userInput: varchar(),

  device: varchar(),

  createdOn: date().defaultNow(),

  config: json(),

  theme: varchar(),

  projectVisualDescription: text(),

  // 🔹 ADDED: full canvas screenshot
  screenshotUrl: varchar({ length: 1024 }),

  userId: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.email, {
      onDelete: "cascade",
    }),
});

/* ================= SCREEN CONFIG ================= */



export const ScreenConfig = pgTable("screenConfig", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

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

