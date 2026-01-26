import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";

/* ================= POST (CREATE PROJECT) ================= */
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userInput, device, projectId } = await req.json();

  const result = await db
    .insert(ProjectTable)
    .values({
      projectId,
      userId: user.primaryEmailAddress?.emailAddress as string,
      device,
      userInput,
    })
    .returning();

  return NextResponse.json(result[0]);
}

/* ================= GET (ONE PROJECT / ALL PROJECTS) ================= */
export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.primaryEmailAddress?.emailAddress as string;
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  /* ===== GET ALL PROJECTS ===== */
  if (!projectId) {
    const projects = await db
      .select()
      .from(ProjectTable)
      .where(eq(ProjectTable.userId, userId))
      

    return NextResponse.json(projects);
  }

  /* ===== GET SINGLE PROJECT ===== */
  const project = await db
    .select()
    .from(ProjectTable)
    .where(
      and(
        eq(ProjectTable.projectId, projectId),
        eq(ProjectTable.userId, userId)
      )
    )
    .limit(1);

  if (!project.length) {
    return NextResponse.json(null);
  }

  const screens = await db
    .select()
    .from(ScreenConfig)
    .where(eq(ScreenConfig.projectId, projectId));

  return NextResponse.json({
    projectDetail: project[0],
    screenConfig: screens,
  });
}

/* ================= PUT (SAVE ALL CHANGES) ================= */
export async function PUT(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, projectName, theme } = await req.json();

  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );
  }

  const updated = await db
    .update(ProjectTable)
    .set({
      projectName,
      theme,
    })
    .where(
      and(
        eq(ProjectTable.projectId, projectId),
        eq(
          ProjectTable.userId,
          user.primaryEmailAddress?.emailAddress as string
        )
      )
    )
    .returning();

  if (!updated.length) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ project: updated[0] });
}
