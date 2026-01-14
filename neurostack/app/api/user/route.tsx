import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  // 1️⃣ Auth guard
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const email = user.primaryEmailAddress.emailAddress;

  // 2️⃣ Check if user exists
  const existingUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // 3️⃣ Insert if not exists
  if (existingUsers.length === 0) {
    const result = await db
      .insert(usersTable)
      .values({
        name: user.fullName ?? "",
        email: email,
      })
      .returning();

    return NextResponse.json(result[0]);
  }

  // 4️⃣ Return existing user
  return NextResponse.json(existingUsers[0]);
}
