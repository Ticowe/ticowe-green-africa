import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

// ── Browser client ─────────────────────────────────────────────
// Safe to import in "use client" components
// import { supabase } from "@/lib/supabase/client"

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
