import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

import {
  APP_LAYOUT_CONFIG_PROMPT,
  GENERATE_NEW_SCREEN_IN_EXISTING_PROJECT_PROJECT,
  GENERATION_SYSTEM_PROMPT,
} from "@/data/prompt";

import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { ai } from "@/config/gemini";

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

    /* ================= STEP 1: GENERATE NEW SCREEN CONFIG ================= */
    const configPrompt = `
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

RULES:
- Return ONLY valid JSON
- Generate EXACTLY ONE screen
`;

    const configRes = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: configPrompt }] }],
    });

    let configText =
      configRes.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!configText) throw new Error("Empty screen config output");

    configText = configText.replace(/```json|```/g, "").trim();
    const configJson = JSON.parse(configText);

    if (!configJson.screens || configJson.screens.length !== 1) {
      throw new Error("AI must return exactly one screen");
    }

    const newScreen = configJson.screens[0];

    /* ================= DUPLICATE SCREEN GUARD ================= */
    if (existingScreens.some((s) => s.screenId === newScreen.id)) {
      throw new Error("Duplicate screen id generated");
    }

    /* ================= STEP 2: GENERATE SCREEN HTML (USING YOUR PROMPT) ================= */
    const htmlPrompt = `
${GENERATION_SYSTEM_PROMPT}

DEVICE TYPE:
${deviceType}

PROJECT THEME:
${project.theme}

GLOBAL VISUAL SYSTEM:
${project.projectVisualDescription}

SCREEN NAME:
${newScreen.name}

SCREEN PURPOSE:
${newScreen.purpose}

SCREEN LAYOUT DESCRIPTION:
${newScreen.layoutDescription}

Generate the full HTML UI for this screen.
`;

    const htmlRes = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: htmlPrompt }] }],
    });

    let htmlCode =
      htmlRes.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!htmlCode) throw new Error("Empty HTML output");

    htmlCode = htmlCode.replace(/```html|```/g, "").trim();

    /* ================= INSERT SCREEN WITH HTML ================= */
    await db.insert(ScreenConfig).values({
      projectId,
      screenId: newScreen.id,
      screenName: newScreen.name,
      purpose: newScreen.purpose,
      screenDescription: newScreen.layoutDescription,
      code: htmlCode, // 🔥 THIS IS THE KEY FIX
    });

    return NextResponse.json({
      success: true,
      screen: {
        screenId: newScreen.id,
        screenName: newScreen.name,
        purpose: newScreen.purpose,
        screenDescription: newScreen.layoutDescription,
        code: htmlCode,
      },
    });
  } catch (err: any) {
    console.error("ADD SCREEN ERROR:", err);
    return NextResponse.json(
      { error: "Failed to add screen", message: err?.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE SCREEN ================= */
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
