import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress.emailAddress;

    // ✅ NO .limit(1)
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
      return NextResponse.json(existingUsers[0]);
    }

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

    return NextResponse.json(inserted[0]);
  } catch (error) {
    console.error("POST /api/user error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
