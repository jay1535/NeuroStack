import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmailTemplate } from "./emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "NeuroStack <Neurostack@contact.intellidocs.in>",
      to: "habbujay51@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: contactEmailTemplate({ name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
