import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = user.primaryEmailAddress.emailAddress;
    const { projectId, screenshotUrl } = await req.json();

    if (!projectId || !screenshotUrl) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(ProjectTable)
      .set({ screenshotUrl })
      .where(
        and(
          eq(ProjectTable.projectId, projectId),
          eq(ProjectTable.userId, userId)
        )
      )
      .returning({ id: ProjectTable.projectId });

    if (!updated.length) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Screenshot save failed:", err);
    return NextResponse.json(
      { error: "Failed to save screenshot" },
      { status: 500 }
    );
  }
}
