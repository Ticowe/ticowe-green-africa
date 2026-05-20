import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { id, email, subject, reply } = await req.json();

    // 1. send email via Resend
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      to: email,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family:Arial;line-height:1.6">
          <h2>Response from TICOWE Green Africa</h2>
          <p>${reply}</p>
          <br/>
          <p>— TICOWE Green Africa Team</p>
        </div>
      `,
    });

    // 2. update message status (Cast to 'any' to bypass strict validation constraints)
    await (supabaseAdmin as any)
      .from("messages")
      .update({ status: "replied" })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}