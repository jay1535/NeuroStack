import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const user = await currentUser();

    // ✅ User not logged in → do nothing
    if (!user) {
      return NextResponse.json(null, { status: 200 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    const name = user.fullName ?? "User";

    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    // ✅ Create only once
    const [created] = await db
      .insert(usersTable)
      .values({
        name,
        email,
      })
      .returning();

    return NextResponse.json(created);
  } catch (err) {
    console.error("USER CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
