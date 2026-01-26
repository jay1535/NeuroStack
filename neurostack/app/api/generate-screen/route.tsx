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
      projectVisualDescription,
    } = await req.json();

    if (!projectId || !screenId) {
      return NextResponse.json(
        { error: "Missing projectId or screenId" },
        { status: 400 }
      );
    }

    const userInput = `
Screen Name is: ${screenName}
Screen Purpose is: ${purpose}
Screen Description is: ${screenDescription}
Project Visual Description: ${projectVisualDescription}
`;

    const prompt = `
DEVICE TYPE: ${deviceType}

${GENERATION_SYSTEM_PROMPT.replace("{deviceType}", deviceType)}

USER INPUT:
${userInput}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const code =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!code) {
      return NextResponse.json(
        { error: "No output generated" },
        { status: 500 }
      );
    }

    const existing = await db
      .select()
      .from(ScreenConfig)
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      )
      .limit(1);

    if (existing.length) {
      await db
        .update(ScreenConfig)
        .set({
          code,
          
        })
        .where(
          and(
            eq(ScreenConfig.projectId, projectId),
            eq(ScreenConfig.screenId, screenId)
          )
        );
    } else {
      await db.insert(ScreenConfig).values({
        projectId,
        screenId,
        screenName,
        purpose,
        screenDescription, // ✅ FIXED
        code,
       
      });
    }

    return NextResponse.json({
      success: true,
      screenId,
      code,
    });
  } catch (error) {
    console.error("❌ generate-screen error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
