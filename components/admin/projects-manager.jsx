'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  ImageOff,
  RefreshCw,
} from 'lucide-react'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { ProjectForm } from '@/components/admin/project-form'

export function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [editing, setEditing] = useState(null) // project | 'new' | null
  const [deleting, setDeleting] = useState(null) // project | null
  const [deleteBusy, setDeleteBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const res = await fetch('/api/admin/projects')
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to load projects.')
      setProjects(data.projects || [])
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Open the add dialog when arriving via command palette (?new=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('new') === '1') setEditing('new')
  }, [])

  const handleSaved = (saved) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === saved.id)
      return exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev]
    })
    setEditing(null)
  }

  const confirmDelete = async () => {
    if (!deleting) return
    setDeleteBusy(true)
    try {
      const res = await fetch(`/api/admin/projects/${deleting.id}`, {
        method: 'DELETE',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to delete.')
      setProjects((prev) => prev.filter((p) => p.id !== deleting.id))
      toast.success('Project deleted')
      setDeleting(null)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleteBusy(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage the projects shown on your portfolio.
          </p>
        </div>
        <Button onClick={() => setEditing('new')}>
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add project</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading…
          </div>
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={load} />
        ) : projects.length === 0 ? (
          <EmptyState onAdd={() => setEditing('new')} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14 font-mono text-[10px] uppercase tracking-[0.15em]">Cover</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.15em]">Title</TableHead>
                <TableHead className="hidden font-mono text-[10px] uppercase tracking-[0.15em] sm:table-cell">Category</TableHead>
                <TableHead className="hidden font-mono text-[10px] uppercase tracking-[0.15em] md:table-cell">Status</TableHead>
                <TableHead className="hidden font-mono text-[10px] uppercase tracking-[0.15em] lg:table-cell">Links</TableHead>
                <TableHead className="w-20 text-right font-mono text-[10px] uppercase tracking-[0.15em]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Thumb src={Array.isArray(p.images) ? p.images[0] : p.image} title={p.title} />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{p.title}</div>
                    {p.badge && (
                      <div className="text-xs text-muted-foreground">
                        {p.badge}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">
                      {p.category === 'frontend' ? 'Frontend' : 'Full stack'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {p.featured === false ? (
                      <Badge variant="muted" dot>
                        Hidden
                      </Badge>
                    ) : (
                      <Badge variant="success" dot>
                        Visible
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" title="Live">
                          <ExternalLink className="size-4 hover:text-foreground" />
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" title="GitHub">
                          <GithubIcon className="size-4 hover:text-foreground" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => setEditing(p)}
                        aria-label={`Edit ${p.title}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleting(p)}
                        aria-label={`Delete ${p.title}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Add / edit dialog */}
      <Dialog
        open={editing !== null}
        onOpenChange={(o) => !o && setEditing(null)}
      >
        <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-4xl">
          {editing !== null && (
            <ProjectForm
              project={editing === 'new' ? null : editing}
              onSaved={handleSaved}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={deleting !== null}
        onOpenChange={(o) => !o && setDeleting(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              Delete “{deleting?.title}”? This can’t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteBusy}
            >
              {deleteBusy && <Loader2 className="size-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Thumb({ src, title }) {
  if (!src) {
    return (
      <div className="flex size-10 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
        <ImageOff className="size-4" />
      </div>
    )
  }
  return (
    <div className="relative size-10 overflow-hidden rounded-md border border-border">
      <Image src={src} alt={title} fill sizes="40px" className="object-cover" />
    </div>
  )
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-sm text-muted-foreground">No projects yet.</p>
      <Button onClick={onAdd} size="sm">
        <Plus className="size-4" />
        Add your first project
      </Button>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <p className="max-w-md text-xs text-muted-foreground">
        Make sure Supabase env vars are set and you ran{' '}
        <code className="rounded bg-muted px-1">supabase/schema.sql</code>.
      </p>
      <Button onClick={onRetry} size="sm" variant="outline">
        <RefreshCw className="size-4" />
        Retry
      </Button>
    </div>
  )
}
