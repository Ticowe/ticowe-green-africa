"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import VolunteersClient from "./VolunteersClient";

async function getVolunteers() {
  // Cast to any to bypass strict type schema parsing
  const { data, error } = await (supabaseAdmin as any)
    .from("volunteers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

// ── Server Actions ────────────────────────────────────────────

export async function approveVolunteer(id: string) {
  "use server";
  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "approved" })
    .eq("id", id);
  revalidatePath("/admin/volunteers");
}

export async function rejectVolunteer(id: string) {
  "use server";
  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "rejected" })
    .eq("id", id);
  revalidatePath("/admin/volunteers");
}

export async function activateVolunteer(id: string) {
  "use server";
  await (supabaseAdmin as any)
    .from("volunteers")
    .update({ status: "active" })
    .eq("id", id);
  revalidatePath("/admin/volunteers");
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