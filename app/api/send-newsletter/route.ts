import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      excerpt,
      category,
      cover_image,
      articleId,
    } = body;

    // Get subscribers
    const { data: subscribers, error } = await supabase
      .from("subscribers")
      .select("email");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No subscribers found",
      });
    }

    const emails = subscribers.map((s) => s.email);

    const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${articleId}`;

    await resend.emails.send({
      from: "TICOWE Green Africa <news@ticowegreenafrica.com>",
      to: emails,
      subject: `New Article: ${title}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:20px;">
          
          ${
            cover_image
              ? `
            <img 
              src="${cover_image}" 
              alt="${title}" 
              style="width:100%;border-radius:12px;margin-bottom:20px;"
            />
          `
              : ""
          }

          <p style="color:#C65D3A;font-size:12px;font-weight:bold;letter-spacing:1px;">
            ${category}
          </p>

          <h1 style="color:#0F4C4C;">
            ${title}
          </h1>

          <p style="font-size:16px;line-height:1.8;color:#444;">
            ${excerpt}
          </p>

          <a
            href="${articleUrl}"
            style="
              display:inline-block;
              margin-top:20px;
              background:#0F4C4C;
              color:white;
              text-decoration:none;
              padding:14px 22px;
              border-radius:10px;
              font-weight:bold;
            "
          >
            Read Full Article
          </a>

          <p style="margin-top:40px;font-size:13px;color:#777;">
            You are receiving this email because you subscribed to TICOWE Green Africa updates.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}