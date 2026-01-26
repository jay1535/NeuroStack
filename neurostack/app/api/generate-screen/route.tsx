import { ai } from "@/config/gemini";
import { GENERATION_SYSTEM_PROMPT } from "@/data/prompt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ScreenConfig } from "@/config/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const {
      deviceType,
      projectId,
      screenId,
      screenName,
      purpose,
      screenDescription,
    } = await req.json();

    if (!projectId || !screenId || !deviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `
DEVICE TYPE: ${deviceType}

${GENERATION_SYSTEM_PROMPT.replace("{deviceType}", deviceType)}

Screen Name: ${screenName}
Purpose: ${purpose}
Description: ${screenDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let raw =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!raw) throw new Error("Empty Gemini output");

    const code = raw
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    await db
      .update(ScreenConfig)
      .set({ code })
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("GENERATE SCREEN ERROR:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
