import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (
      !imageBase64 ||
      typeof imageBase64 !== "string" ||
      !imageBase64.startsWith("data:image")
    ) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const upload = await cloudinary.uploader.upload(imageBase64, {
      folder: "project-screenshots",
      resource_type: "image",
      overwrite: true,
    });

    return NextResponse.json({
      url: upload.secure_url,
    });
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", message: err?.message },
      { status: 500 }
    );
  }
}
