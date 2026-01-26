import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    const upload = await cloudinary.uploader.upload(imageBase64, {
      folder: "project-screenshots",
    });

    return NextResponse.json({
      url: upload.secure_url,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
