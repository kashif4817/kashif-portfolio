import { getSupabase, isSupabaseConfigured } from './supabase/client'

export async function getPublicProjects() {
  if (!isSupabaseConfigured) return []

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data.map(normalizeProject)
}

export function normalizeProject(row) {
  const images = Array.isArray(row.images) && row.images.length
    ? row.images.filter(Boolean)
    : row.image
      ? [row.image]
      : []
  return {
    id: row.id,
    title: row.title,
    badge: row.badge ?? '',
    description: row.description ?? '',
    tech: Array.isArray(row.tech) ? row.tech : [],
    link: row.link ?? '',
    github: row.github || null,
    images,
    image: images[0] || null,
    category: row.category === 'frontend' ? 'frontend' : 'fullstack',
    gradient: row.gradient || 'from-zinc-600 to-zinc-800',
    icon: row.icon || (row.title?.[0]?.toUpperCase() ?? 'P'),
  }
}

export async function getProjectById(id) {
  if (!isSupabaseConfigured) return null
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return normalizeProject(data)
}

export const PROJECT_CATEGORIES = [
  { value: 'fullstack', label: 'Full stack' },
  { value: 'frontend', label: 'Frontend' },
]
