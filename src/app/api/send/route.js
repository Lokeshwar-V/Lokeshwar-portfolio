import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, subject and message are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL;

    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;">
          <h2>New portfolio message</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ id: data.id, message: "Sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to send message at this time." },
      { status: 500 }
    );
  }
}
