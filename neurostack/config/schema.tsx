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
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  credits: integer("credits").notNull().default(10),
});


/* ================= PROJECT ================= */

export const ProjectTable = pgTable("project", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  projectId: varchar("project_id", { length: 255 }).notNull().unique(),

  projectName: varchar("project_name", { length: 255 }),

  userInput: text("user_input"),

  device: varchar("device", { length: 50 }),

  createdOn: date("created_on").defaultNow(),

  config: json("config"),

  theme: varchar("theme", { length: 100 }),

  projectVisualDescription: text("project_visual_description"),

  screenshotUrl: varchar("screenshot_url", { length: 1024 }),

  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => usersTable.email, {
      onDelete: "cascade",
    }),
});

/* ================= SCREEN CONFIG ================= */

export const ScreenConfig = pgTable("screen_config", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  projectId: varchar("project_id", { length: 255 })
    .notNull()
    .references(() => ProjectTable.projectId, {
      onDelete: "cascade",
    }),

  screenId: varchar("screen_id", { length: 255 }).notNull(),

  screenName: varchar("screen_name", { length: 255 }),

  purpose: text("purpose"),

  screenDescription: text("screen_description"),

  code: text("code"),
});
