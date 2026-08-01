import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Activity ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: activity, error } = await (
      supabaseAdmin as any
    )
      .from("activities")
      .select(`
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
        status,
        published_at,
        created_at
      `)
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error || !activity) {
      return NextResponse.json(
        {
          success: false,
          message: "Activity not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error("Single activity API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load activity.",
      },
      {
        status: 500,
      },
    );
  }
}