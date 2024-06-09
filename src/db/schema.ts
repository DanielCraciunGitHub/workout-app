import type { AdapterAccount } from "@auth/core/adapters"
import { relations, sql } from "drizzle-orm"
import {
  AnySQLiteColumn,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { ulid } from "ulid"

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role", { enum: ["ADMIN", "USER"] }).default("USER"),
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export const exercises = sqliteTable("exercises", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text("name").notNull(),
  muscle: text("muscle").notNull(),
  difficulty: text("difficulty").notNull(),
})
export const userExerciseData = sqliteTable("userExerciseData", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  exerciseId: text("exerciseId")
    .notNull()
    .references(() => exercises.id),
  volume: integer("volume", { mode: "number" }).default(0).notNull(),
  date: text("date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const userExerciseRelations = relations(userExerciseData, ({ one }) => ({
  user: one(users, {
    fields: [userExerciseData.userId],
    references: [users.id],
    relationName: "user",
  }),
  exercises: one(exercises, {
    fields: [userExerciseData.exerciseId],
    references: [exercises.id],
    relationName: "exercise",
  }),
}))
