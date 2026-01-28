"use server";

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createUserIfNotExists() {
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("Unauthorized");
  }

  const email = user.primaryEmailAddress.emailAddress;

  /* ================= FETCH ================= */
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existing.length > 0) {
    return existing[0];
  }

  /* ================= INSERT ================= */
  try {
    const inserted = await db
      .insert(usersTable)
      .values({
        name: user.fullName ?? "User",
        email,
        credits: 10,
      })
      .returning();

    return inserted[0];
  } catch (err: any) {
    // 🔒 Neon race-condition safe fallback
    const fallback = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (fallback.length > 0) {
      return fallback[0];
    }

    throw err;
  }
}
