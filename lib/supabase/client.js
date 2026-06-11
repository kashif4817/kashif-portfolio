import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** True when Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(url && anonKey)

/**
 * Anonymous client — safe for the browser and server reads.
 * Returns null if env vars aren't set, so callers can fall back gracefully.
 */
export function getSupabase() {
  if (!isSupabaseConfigured) return null
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  })
}
