import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;

/**
 * Returns a shared Supabase client, or null if env vars aren't configured yet.
 * Callers must fall back to static content when this returns null, so the
 * site keeps working before/while Supabase is being set up.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;
  return client;
}
