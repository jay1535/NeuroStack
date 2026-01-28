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

  /* ================= FETCH USER ================= */
  const existingUsers = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      credits: usersTable.credits,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUsers.length > 0) {
    return existingUsers[0];
  }

  /* ================= INSERT USER ================= */
  try {
    const inserted = await db
      .insert(usersTable)
      .values({
        name: user.fullName ?? "User",
        email,
        credits: 10,
      })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        credits: usersTable.credits,
      });

    return inserted[0];
  } catch (err: any) {
    // race-condition fallback
    if (err?.message?.includes("duplicate")) {
      const fallback = await db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          credits: usersTable.credits,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (fallback.length > 0) {
        return fallback[0];
      }
    }

    throw err;
  }
}
