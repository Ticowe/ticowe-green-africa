import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, receipt } = await req.json();

    // Validate fields
    if (!name || !email || !phone || !receipt) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields!.",
        },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error } = await (supabaseAdmin as any)
      .from("memberships")
      .insert([
        {
          full_name: name,
          email,
          phone,
          receipt_number: receipt,
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
    // =============================
    // Notify Admin
    // =============================
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      replyTo: email,
      to: "admin@ticowegreenafrica.com",
      subject: `New Membership Application - ${name}`,
      html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f7f9;padding:40px;">
        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">

          <div style="background:#0F4C4C;color:white;padding:25px;">
            <h2 style="margin:0;">New Membership Application</h2>
          </div>

          <div style="padding:30px;">

            <table style="width:100%;border-collapse:collapse;">

              <tr>
                <td style="padding:10px;font-weight:bold;width:180px;">Full Name</td>
                <td style="padding:10px;">${name}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px;font-weight:bold;">Email</td>
                <td style="padding:10px;">${email}</td>
              </tr>

              <tr>
                <td style="padding:10px;font-weight:bold;">Phone</td>
                <td style="padding:10px;">${phone}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px;font-weight:bold;">M-Pesa Receipt</td>
                <td style="padding:10px;font-size:18px;font-weight:bold;color:#C65D3A;">
                  ${receipt}
                </td>
              </tr>

              <tr>
                <td style="padding:10px;font-weight:bold;">Status</td>
                <td style="padding:10px;">
                  Pending Verification
                </td>
              </tr>

            </table>

          </div>

          <div style="background:#f4f7f9;padding:18px;text-align:center;color:#666;font-size:13px;">
            TICOWE Green Africa Membership System
          </div>

        </div>
      </div>
      `,
    });

    // =============================
    // Confirmation Email
    // =============================
    await resend.emails.send({
      from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
      to: email,
      subject: "Your Membership Application Has Been Received 💚",
      html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f7f9;padding:40px;">

        <div style="max-width:650px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">

          <div style="background:#0F4C4C;color:white;text-align:center;padding:30px;">
            <h1 style="margin:0;">
              Thank You!
            </h1>
          </div>

          <div style="padding:35px;color:#444;">

            <p>Dear <strong>${name}</strong>,</p>

            <p>
              Thank you for applying to become a member of
              <strong>TICOWE Green Africa.</strong>
            </p>

            <p>
              We have successfully received your membership application
              together with your M-Pesa payment details.
            </p>

            <div style="background:#F4F8F4;border-left:4px solid #0F4C4C;padding:20px;margin:25px 0;">

              <h3 style="margin-top:0;">
                Application Summary
              </h3>

              <p><strong>Name:</strong> ${name}</p>

              <p><strong>Phone:</strong> ${phone}</p>

              <p><strong>Email:</strong> ${email}</p>

              <p><strong>M-Pesa Receipt:</strong> ${receipt}</p>

              <p><strong>Status:</strong> Pending Verification</p>

            </div>

            <p>
              Our team will verify your payment and activate your membership.
              Once approved, you will receive another email confirming your
              membership.
            </p>

            <p>
              Thank you for supporting our mission of environmental conservation,
              sustainable development, and community empowerment.
            </p>

            <p style="margin-top:35px;">
              Kind regards,<br>
              <strong>TICOWE Green Africa Team</strong>
            </p>

          </div>

          <div style="background:#f4f7f9;padding:20px;text-align:center;color:#777;font-size:13px;">
            © ${new Date().getFullYear()} TICOWE Green Africa<br>
            Empowering Communities. Protecting Nature.
          </div>

        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Membership application submitted successfully.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}