import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // alert(body.amount);

    const {
      reference,
      donor_name,
      donor_email,
      phone,
      amount,
      frequency,
      payment_method,
    } = body;

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json(
        { success: false, message: "Payment not verified" },
        { status: 400 }
      );
    }

    const { error: insertError } = await (supabaseAdmin as any)
  .from("donations")
  .insert({
    donor_name,
    donor_email,
    amount,
    phone,
    frequency,
    payment_method,
    status: "completed",
  });

if (insertError) {
  console.error("Insert error:", insertError);
  return NextResponse.json(
    { success: false, message: "Database insert failed" },
    { status: 500 }
  );
}

    // Cast supabaseAdmin instance to 'any' to bypass strict schema properties
    // await (supabaseAdmin as any).from("donations").insert({
    //   donor_name,
    //   donor_email,
    //   amount,
    //   phone,
    //   frequency,
    //   payment_method,
    //   status: "completed",
    // });
    // console.log("Success.");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}