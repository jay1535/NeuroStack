import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ScreenConfig } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { ai } from "@/config/gemini";

export async function POST(req: NextRequest) {
  try {
    const { projectId, screenId, userInput, oldCode } =
      await req.json();

    if (!projectId || !screenId || !userInput || !oldCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert frontend developer.

TASK:
Modify the EXISTING HTML + Tailwind code based on the user's request.

RULES:
- Keep structure unless requested
- Improve UI/UX
- Use Tailwind CSS only
- Return ONLY valid HTML
- Do NOT add explanations

USER REQUEST:
${userInput}

EXISTING CODE:
${oldCode}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const newCode =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!newCode) {
      return NextResponse.json(
        { error: "AI returned empty output" },
        { status: 500 }
      );
    }

    await db
      .update(ScreenConfig)
      .set({ code: newCode })
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("EDIT SCREEN ERROR:", err);
    return NextResponse.json(
      { error: "Failed to edit screen" },
      { status: 500 }
    );
  }
}
