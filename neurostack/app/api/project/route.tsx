import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

/* ================= POST ================= */
export async function POST(req: NextRequest) {
  const { userInput, device, projectId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

/* ================= GET ================= */
export async function GET(req: NextRequest) {
    const user = await currentUser();
  
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
  
    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }
  
    /* ===== Fetch Project ===== */
    const project = await db
      .select()
      .from(ProjectTable)
      .where(
        and(
          eq(ProjectTable.projectId, projectId),
          eq(
            ProjectTable.userId,
            user.primaryEmailAddress?.emailAddress as string
          )
        )
      )
      .limit(1);
  
    if (!project.length) {
      return NextResponse.json(null);
    }
  
    /* ===== Fetch Screen Config ===== */
    const screens = await db
      .select()
      .from(ScreenConfig)
      .where(eq(ScreenConfig.projectId, projectId));
  
   
  
    /* ===== RESPONSE ===== */
    return NextResponse.json({
      projectDetail : project[0],
      screenConfig : screens,
    });
  }


  /* ================= PUT ================= */
export async function PUT(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, projectName } = await req.json();

  if (!projectId || !projectName) {
    return NextResponse.json(
      { error: "projectId and projectName are required" },
      { status: 400 }
    );
  }

  // 🔥 OVERWRITE projectName
  const updatedProject = await db
    .update(ProjectTable)
    .set({
      projectName,
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

  if (!updatedProject.length) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    project: updatedProject[0],
  });
}
