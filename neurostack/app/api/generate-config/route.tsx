import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/prompt";
import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { eq } from "drizzle-orm";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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
