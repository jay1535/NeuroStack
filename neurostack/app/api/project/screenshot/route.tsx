import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";

export async function POST(req: Request) {
  try {
    const { projectId, screenshotUrl } = await req.json();

    if (!projectId || !screenshotUrl) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    await db
      .update(ProjectTable)
      .set({ screenshotUrl })
      .where(eq(ProjectTable.projectId, projectId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save screenshot" },
      { status: 500 }
    );
  }
}
