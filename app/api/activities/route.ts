import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { data: activities, error } = await supabaseAdmin
      .from("activities")
      .select(
        `
          id,
          title,
          excerpt,
          description,
          category,
          activity_date,
          location,
          media,
          cover_media_url,
          cover_media_type,
          published_at,
          created_at
        `,
      )
      .eq("status", "published")
      .order("activity_date", {
        ascending: false,
      });

    if (error) {
      console.error("Activities query error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      activities: activities ?? [],
    });
  } catch (error) {
    console.error("Activities API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load activities.",
      },
      {
        status: 500,
      },
    );
  }
}