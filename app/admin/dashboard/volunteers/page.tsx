"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import VolunteersClient from "./VolunteersClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getVolunteers() {
  const { data, error } = await (supabaseAdmin as any)
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

// ── Approve Volunteer ────────────────────────────────────────

export async function approveVolunteer(id: string) {
  "use server";

  // Get volunteer info
  const { data: volunteer, error: fetchError } = await (supabaseAdmin as any)
    .from("volunteers")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !volunteer) {
    throw new Error("Volunteer not found");
  }

  // Update status
  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "approved" })
    .eq("id", id);

  // Send approval email
  await resend.emails.send({
    from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
    to: volunteer.email,
    subject: "Your Volunteer Application Has Been Approved 🎉",
    html: `
      <div style="font-family: Arial; line-height: 1.6;">
        <h2>Congratulations ${volunteer.full_name},</h2>

        <p>
          We are pleased to inform you that your volunteer application
          has been approved.
        </p>

        <p>
          Thank you for your willingness to support TICOWE Green Africa and
          serve communities through our programs.
        </p>

        <p>
          Our team will contact you soon with next steps and onboarding
          information.
        </p>

        <br/>

        <p>Warm regards,</p>
        <p><strong>TICOWE Africa Team</strong></p>
      </div>
    `,
  });

  revalidatePath("/admin/dashboard/volunteers");
}

// ── Reject Volunteer ─────────────────────────────────────────

export async function rejectVolunteer(id: string) {
  "use server";

  // Get volunteer info
  const { data: volunteer, error: fetchError } = await (supabaseAdmin as any)
    .from("volunteers")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !volunteer) {
    throw new Error("Volunteer not found");
  }

  // Update status
  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "rejected" })
    .eq("id", id);

  // Send rejection email
  await resend.emails.send({
    from: "TICOWE Green Africa <noreply@ticowegreenafrica.com>",
    to: volunteer.email,
    subject: "Volunteer Application Update",
    html: `
      <div style="font-family: Arial; line-height: 1.6;">
        <h2>Hello ${volunteer.full_name},</h2>

        <p>
          Thank you for your interest in volunteering with TICOWE Africa.
        </p>

        <p>
          After reviewing your application, we regret to inform you that
          we are unable to proceed with your application at this time.
        </p>

        <p>
          We sincerely appreciate your willingness to support our mission
          and encourage you to apply again in the future.
        </p>

        <br/>

        <p>Kind regards,</p>
        <p><strong>TICOWE Green Africa Team</strong></p>
      </div>
    `,
  });

  revalidatePath("/admin/dashboard/volunteers");
}

// ── Activate Volunteer ───────────────────────────────────────

export async function activateVolunteer(id: string) {
  "use server";

  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "active" })
    .eq("id", id);

  revalidatePath("/admin/dashboard/volunteers");
}

export default async function VolunteersPage() {
  const volunteers = await getVolunteers();

  return (
    <VolunteersClient
      volunteers={volunteers}
      approveVolunteer={approveVolunteer}
      rejectVolunteer={rejectVolunteer}
      activateVolunteer={activateVolunteer}
    />
  );
}