import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      country,
      skills,
      motivation,
      duration,
    } = await req.json();

    // Save application
    const { error } = await (supabaseAdmin as any)
      .from("volunteers")
      .insert([
        {
          full_name: name,
          email,
          phone,
          country,
          skills,
          motivation,
          duration,
          status: "pending",
        },
      ]);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    // ==========================
    // Email to Admin
    // ==========================
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      replyTo: email,
      to: "admin@ticowegreenafrica.com",
      subject: `New Volunteer Application - ${name}`,
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f7f9; padding:40px;">
        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.08);">

          <div style="background:#1B5E20; color:white; padding:25px;">
            <h2 style="margin:0;">New Volunteer Application</h2>
            <p style="margin:8px 0 0;">A new volunteer has submitted an application.</p>
          </div>

          <div style="padding:30px;">

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px; font-weight:bold; width:180px;">Full Name</td>
                <td style="padding:10px;">${name}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px; font-weight:bold;">Email</td>
                <td style="padding:10px;">${email}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Phone</td>
                <td style="padding:10px;">${phone}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px; font-weight:bold;">Country</td>
                <td style="padding:10px;">${country}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Preferred Duration</td>
                <td style="padding:10px;">${duration}</td>
              </tr>
            </table>

            <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;" />

            <h3 style="color:#1B5E20;">Skills</h3>
            <p style="background:#f8f8f8; padding:15px; border-radius:6px;">
              ${skills}
            </p>

            <h3 style="color:#1B5E20;">Motivation</h3>
            <p style="background:#f8f8f8; padding:15px; border-radius:6px;">
              ${motivation}
            </p>

          </div>

          <div style="background:#f4f7f9; padding:20px; text-align:center; color:#666; font-size:13px;">
            TICOWE Green Africa Volunteer Management System
          </div>

        </div>
      </div>
      `,
    });

    // ==========================
    // Thank You Email
    // ==========================
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      to: email,
      subject: "We've received your volunteer application 💚",
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f7f9; padding:40px;">

        <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.08);">

          <div style="background:#1B5E20; color:white; text-align:center; padding:30px;">
            <h1 style="margin:0;">Thank You!</h1>
          </div>

          <div style="padding:35px; color:#444;">

            <p>Dear <strong>${name}</strong>,</p>

            <p>
              Thank you for your interest in volunteering with
              <strong>TICOWE Green Africa</strong>.
            </p>

            <p>
              We have successfully received your application and truly
              appreciate your willingness to contribute your time and skills
              toward creating a greener and more sustainable future.
            </p>

            <div style="background:#F4F8F4; border-left:4px solid #1B5E20; padding:20px; margin:25px 0;">
              <h3 style="margin-top:0;">Application Summary</h3>

              <p><strong>Country:</strong> ${country}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Preferred Duration:</strong> ${duration}</p>
            </div>

            <p>
              Our recruitment team will carefully review your application.
              If your profile matches our current volunteer opportunities,
              we will contact you using the email address or phone number
              you provided.
            </p>

            <p>
              We sincerely appreciate your passion for environmental
              conservation and community development.
            </p>

            <p style="margin-top:35px;">
              Warm regards,<br>
              <strong>TICOWE Green Africa Team</strong>
            </p>

          </div>

          <div style="background:#f4f7f9; padding:20px; text-align:center; color:#777; font-size:13px;">
            © ${new Date().getFullYear()} TICOWE Green Africa<br>
            Empowering Communities. Protecting Nature.
          </div>

        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}