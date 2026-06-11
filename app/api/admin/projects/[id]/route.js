import { getSupabaseAdmin } from '@/lib/supabase/admin'

const VALID_CATEGORIES = ['fullstack', 'frontend']

function sanitize(body) {
  const title = String(body?.title ?? '').trim()
  if (!title) return { error: 'Title is required.' }

  const tech = Array.isArray(body?.tech)
    ? body.tech.map((t) => String(t).trim()).filter(Boolean)
    : String(body?.tech ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

  return {
    row: {
      title,
      badge: String(body?.badge ?? '').trim() || null,
      description: String(body?.description ?? '').trim() || null,
      tech,
      link: String(body?.link ?? '').trim() || null,
      github: String(body?.github ?? '').trim() || null,
      images: Array.isArray(body?.images)
        ? body.images.map((s) => String(s).trim()).filter(Boolean)
        : [],
      category: VALID_CATEGORIES.includes(body?.category)
        ? body.category
        : 'fullstack',
      featured: body?.featured !== false,
      sort_order: Number.isFinite(Number(body?.sort_order))
        ? Number(body.sort_order)
        : 0,
    },
  }
}

export async function PUT(req, { params }) {
  const { id } = await params
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { row, error: validationError } = sanitize(body)
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .update(row)
    .eq('id', id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ project: data })
}

export async function DELETE(req, { params }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
