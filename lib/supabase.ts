import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// ── Browser client (use in "use client" components) ───────────
// Import this in Client Components: import { supabase } from "@/lib/supabase"
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ── Server Component client (reads cookies for session) ───────
// Use in Server Components, Server Actions, Route Handlers
// import { createSupabaseServerClient } from "@/lib/supabase"
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
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
          // Server Component — cookies can't be set here (only in middleware)
        }
      },
    },
  });
}

// ── Service Role client (server-side only, bypasses RLS) ──────
// Use in Server Actions / API Routes for admin operations
// NEVER import this in Client Components
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
