import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const { error } = await (supabaseAdmin as any)
      .from("subscribers")
      .insert({
        email,
      });

    if (error && error.code !== "23505") {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    // Send welcome email
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      to: email,
      subject: "Welcome to TICOWE Green Africa",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.7">
          <h2>Thank You for Subscribing</h2>

          <p>
            You have successfully subscribed to TICOWE Green Africa updates.
          </p>

          <p>
            We will keep you updated on:
          </p>

          <ul>
            <li>Community programs</li>
            <li>Volunteer opportunities</li>
            <li>Impact stories</li>
            <li>Events and announcements</li>
          </ul>

          <p>
            Thank you for supporting our mission.
          </p>

          <p>
            TICOWE Green Africa
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}