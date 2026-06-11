import { getSupabaseAdmin } from '@/lib/supabase/admin'

const attempts = new Map()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 8

function rateLimited(ip) {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || rec.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  rec.count += 1
  return rec.count > MAX_ATTEMPTS
}

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'

  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429 },
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('admin_config')
    .select('pin')
    .eq('id', 1)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Admin config not found.' }, { status: 500 })
  }

  const submitted = String(body?.pin ?? '')
  if (submitted !== data.pin) {
    return Response.json({ error: 'Incorrect PIN.' }, { status: 401 })
  }

  return Response.json({ ok: true })
}
