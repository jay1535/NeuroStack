import { NextRequest, NextResponse } from "next/server";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/prompt";
import { db } from "@/config/db";
import { ProjectTable, ScreenConfig } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { ai } from "@/config/gemini";

/* ======================================================
   POST → Generate project config using Gemini
====================================================== */
export async function POST(req: NextRequest) {
  try {
    /* 1️⃣ Parse request body */
    const { deviceType, userInput, projectId } = await req.json();

    /* 2️⃣ Validate input */
    if (!projectId || !deviceType || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* 3️⃣ Build Gemini prompt */
    const prompt = `
DEVICE TYPE: ${deviceType}

${APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType)}

USER INPUT:
${userInput}

RULES:
- Return ONLY valid JSON
`;

    /* 4️⃣ Call Gemini */
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    /* 5️⃣ Extract text safely */
    let text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!text) throw new Error("Empty Gemini output");

    /* 6️⃣ Clean & parse JSON */
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const json = JSON.parse(text);

    if (!Array.isArray(json.screens)) {
      throw new Error("Invalid screens array");
    }

    /* 7️⃣ Update project metadata */
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

    /* 8️⃣ Delete old screens */
    await db
      .delete(ScreenConfig)
      .where(eq(ScreenConfig.projectId, projectId));

    /* 9️⃣ Insert new screens */
    await db.insert(ScreenConfig).values(
      json.screens.map((s: any) => ({
        projectId,
        screenId: s.id,
        screenName: s.name,
        purpose: s.purpose,
        screenDescription: s.layoutDescription,
      }))
    );

    /* 🔟 Success response */
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("GENERATE CONFIG ERROR:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE → Delete a single screen
====================================================== */
export async function DELETE(req: NextRequest) {
  try {
    /* 1️⃣ Parse request body */
    const { projectId, screenId } = await req.json();

    /* 2️⃣ Validate input */
    if (!projectId || !screenId) {
      return NextResponse.json(
        { error: "Missing projectId or screenId" },
        { status: 400 }
      );
    }

    /* 3️⃣ Delete screen */
    await db
      .delete(ScreenConfig)
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      );

    /* 4️⃣ Success response */
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE SCREEN ERROR:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
