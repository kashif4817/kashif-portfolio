import 'server-only'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isAdminSupabaseConfigured = Boolean(url && serviceKey)

/**
 * Service-role client — SERVER ONLY. Bypasses RLS.
 * Only ever call this from API routes already protected by the admin cookie.
 */
export function getSupabaseAdmin() {
  if (!isAdminSupabaseConfigured) {
    throw new Error(
      'Supabase admin not configured — set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
    )
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
