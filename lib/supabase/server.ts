import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database";

// ── Server Component client (reads cookies for session) ───────
// Use in Server Components and Server Actions only
// import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookies can't be mutated here, only in middleware
          }
        },
      },
    }
  );
}

// ── Service Role client (bypasses RLS — server-side only) ─────
// Use in Server Actions / Route Handlers for admin writes
// NEVER import this in Client Components
// import { supabaseAdmin } from "@/lib/supabase/server"

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
