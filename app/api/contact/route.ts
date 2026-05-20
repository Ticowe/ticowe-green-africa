import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Save to Supabase (Cast to 'any' to bypass strict schema checks)
    const { error } = await (supabaseAdmin as any).from("messages").insert({
      full_name: name,
      email,
      subject,
      message,
      status: "unread",
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    // 2. Send thank you email
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>", // must be verified domain
      to: email,
      subject: "Thank you for contacting TICOWE Green Africa 💚",
      html: `
        <div style="font-family: Arial; line-height: 1.6;">
          <h2>Thank you, ${name}!</h2>
          <p>We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>Our team will respond within 2–3 business days.</p>
          <br/>
          <p>— TICOWE Green Africa Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}