import { NextRequest, NextResponse } from "next/server";

import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/prompt";
import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { ai } from "@/config/gemini";
import { currentUser } from "@clerk/nextjs/server";



export async function POST(req: NextRequest) {
  try {
    const { deviceType, userInput, projectId } = await req.json();

    const prompt = `
DEVICE TYPE: ${deviceType}

${APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType)}

USER INPUT:
${userInput}

RULES:
- Return ONLY valid JSON
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: "Empty Gemini output" },
        { status: 500 }
      );
    }

    const json = JSON.parse(text);

    await db
      .update(ProjectTable)
      .set({
        projectName: json.projectName ?? "Untitled Project",
        theme: json.theme ?? null,
        projectVisualDescription: JSON.stringify(
          json.projectVisualDescription ?? {}
        ),
      })
      .where(eq(ProjectTable.projectId, projectId));

    await db
      .delete(ScreenConfig)
      .where(eq(ScreenConfig.projectId, projectId));

    await db.insert(ScreenConfig).values(
      json.screens.map((s: any) => ({
        projectId,
        screenId: s.id,
        screenName: s.name,
        purpose: s.purpose,
        screenDescription: s.layoutDescription,
      }))
    );

    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Gemini failed", message: err?.message },
      { status: 500 }
    );
  }
}


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