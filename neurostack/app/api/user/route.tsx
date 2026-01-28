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

    /* ================= CHECK USER ================= */
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    /* ================= INSERT USER ================= */
    const inserted = await db
      .insert(usersTable)
      .values({
        name: user.fullName ?? "User",
        email,
        credits: 10,
      })
      .returning();

    return NextResponse.json(inserted[0]);
  } catch (err) {
    console.error("POST /api/user failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
