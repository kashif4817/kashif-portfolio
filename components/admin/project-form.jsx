'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { ImageUpload } from '@/components/admin/image-upload'
import { PROJECT_CATEGORIES } from '@/lib/projects'

const EMPTY = {
  title: '',
  badge: '',
  description: '',
  tech: '',
  link: '',
  github: '',
  images: [],
  category: 'fullstack',
  featured: true,
  sort_order: 0,
}

function toFormState(project) {
  if (!project) return EMPTY
  return {
    ...EMPTY,
    ...project,
    tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
    images: Array.isArray(project.images) && project.images.length
      ? project.images
      : project.image
        ? [project.image]
        : [],
    badge: project.badge || '',
    description: project.description || '',
    link: project.link || '',
    github: project.github || '',
    featured: project.featured !== false,
    sort_order: project.sort_order ?? 0,
  }
}

export function ProjectForm({ project, onSaved, onCancel }) {
  const [form, setForm] = useState(() => toFormState(project))
  const [saving, setSaving] = useState(false)
  const editing = Boolean(project?.id)

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        tech: form.tech
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        sort_order: Number(form.sort_order) || 0,
      }
      const res = await fetch(
        editing ? `/api/admin/projects/${project.id}` : '/api/admin/projects',
        {
          method: editing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to save project.')
      toast.success(editing ? 'Project updated' : 'Project added')
      onSaved(data.project)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{editing ? 'Edit project' : 'Add project'}</DialogTitle>
        <DialogDescription>
          {editing
            ? 'Update the details and save.'
            : 'Add a project to your portfolio. It appears on the public site instantly.'}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-1.5">
        <Label>Images</Label>
        <ImageUpload
          value={form.images}
          onChange={(urls) => setForm((f) => ({ ...f, images: urls }))}
        />
        <p className="text-xs text-muted-foreground">
          First image is the cover. Up to 5. Projects without images show a gradient card.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={set('title')}
            placeholder="Ecommerce Web App"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="badge">Badge</Label>
          <Input
            id="badge"
            value={form.badge}
            onChange={set('badge')}
            placeholder="Full Stack"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={set('description')}
          rows={3}
          placeholder="Short summary of what you built and the key features."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tech">Tech stack</Label>
        <Input
          id="tech"
          value={form.tech}
          onChange={set('tech')}
          placeholder="Next.js, React, Node.js, PostgreSQL"
        />
        <p className="text-xs text-muted-foreground">Comma-separated.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="link">Live / primary link</Label>
          <Input
            id="link"
            value={form.link}
            onChange={set('link')}
            placeholder="https://…"
            type="url"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="github">GitHub link</Label>
          <Input
            id="github"
            value={form.github}
            onChange={set('github')}
            placeholder="https://github.com/…"
            type="url"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Select id="category" value={form.category} onChange={set('category')}>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input
            id="sort_order"
            type="number"
            value={form.sort_order}
            onChange={set('sort_order')}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="featured">Visibility</Label>
          <Select
            id="featured"
            value={form.featured ? 'yes' : 'no'}
            onChange={(e) =>
              setForm((f) => ({ ...f, featured: e.target.value === 'yes' }))
            }
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="size-4 animate-spin" />}
          {editing ? 'Save changes' : 'Add project'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export { EMPTY }
