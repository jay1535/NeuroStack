import { NextRequest, NextResponse } from "next/server";

import {
  APP_LAYOUT_CONFIG_PROMPT,
  GENERATE_NEW_SCREEN_IN_EXISTING_PROJECT_PROJECT,
} from "@/data/prompt";

import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { ai } from "@/config/gemini";
import { currentUser } from "@clerk/nextjs/server";

/* ================= ADD NEW SCREEN ================= */
export async function POST(req: NextRequest) {
  try {
    /* ================= AUTH ================= */
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ================= BODY ================= */
    const { deviceType, userInput, projectId } = await req.json();

    if (!projectId || !deviceType || !userInput) {
      return NextResponse.json(
        { error: "projectId, deviceType, userInput are required" },
        { status: 400 }
      );
    }

    /* ================= FETCH PROJECT ================= */
    const projectRows = await db
      .select()
      .from(ProjectTable)
      .where(eq(ProjectTable.projectId, projectId))
      .limit(1);

    const project = projectRows[0];

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    /* ================= FETCH EXISTING SCREENS ================= */
    const existingScreens = await db
      .select()
      .from(ScreenConfig)
      .where(eq(ScreenConfig.projectId, projectId));

    const oldScreens = existingScreens.map((s) => ({
      id: s.screenId,
      name: s.screenName,
      purpose: s.purpose,
      layoutDescription: s.screenDescription,
    }));

    /* ================= PROMPT (BOTH PROMPTS USED) ================= */
    const prompt = `
DEVICE TYPE: ${deviceType}

${APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType)}

${GENERATE_NEW_SCREEN_IN_EXISTING_PROJECT_PROJECT.replace(
      "{deviceType}",
      deviceType
    )}

EXISTING THEME:
${project.theme}

EXISTING SCREENS:
${JSON.stringify(oldScreens, null, 2)}

USER REQUEST:
${userInput}
`;

    /* ================= GEMINI ================= */
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const rawText =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty Gemini output" },
        { status: 500 }
      );
    }

    /* ================= SAFE JSON PARSE ================= */
    let json: any;
    try {
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}");
      json = JSON.parse(rawText.slice(start, end + 1));
    } catch {
      console.error("RAW GEMINI OUTPUT:", rawText);
      return NextResponse.json(
        { error: "Invalid AI JSON output" },
        { status: 500 }
      );
    }

    if (!json.screens || json.screens.length !== 1) {
      return NextResponse.json(
        { error: "AI must return exactly ONE screen" },
        { status: 500 }
      );
    }

    const newScreen = json.screens[0];

    /* ================= DUPLICATE SCREEN GUARD ================= */
    const existingIds = new Set(
      existingScreens.map((s) => s.screenId)
    );

    if (existingIds.has(newScreen.id)) {
      return NextResponse.json(
        { error: "Duplicate screen id generated" },
        { status: 500 }
      );
    }

    /* ================= INSERT NEW SCREEN ================= */
    await db.insert(ScreenConfig).values({
      projectId,
      screenId: newScreen.id,
      screenName: newScreen.name,
      purpose: newScreen.purpose,
      screenDescription: newScreen.layoutDescription,
    });

    return NextResponse.json({
      success: true,
      screen: newScreen,
    });
  } catch (err: any) {
    console.error("ADD SCREEN ERROR:", err);
    return NextResponse.json(
      { error: "Gemini failed", message: err?.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE SCREEN (UNCHANGED) ================= */
export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, screenId } = await req.json();

    if (!projectId || !screenId) {
      return NextResponse.json(
        { error: "projectId and screenId are required" },
        { status: 400 }
      );
    }

    await db
      .delete(ScreenConfig)
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE SCREEN ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete screen", message: err?.message },
      { status: 500 }
    );
  }
}
