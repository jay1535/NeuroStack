import { NextRequest, NextResponse } from "next/server";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/prompt";
import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { eq } from "drizzle-orm";
import { ai } from "@/config/gemini";

export async function POST(req: NextRequest) {
  try {
    const { deviceType, userInput, projectId } = await req.json();

    if (!projectId || !deviceType || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!text) throw new Error("Empty Gemini output");

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const json = JSON.parse(text);

    if (!Array.isArray(json.screens)) {
      throw new Error("Invalid screens array");
    }

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

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("GENERATE CONFIG ERROR:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
