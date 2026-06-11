'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FolderKanban, Eye, Layers, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const list = d.projects || []
        setStats({
          total: list.length,
          visible: list.filter((p) => p.featured !== false).length,
          fullstack: list.filter((p) => p.category === 'fullstack').length,
          frontend: list.filter((p) => p.category === 'frontend').length,
        })
      })
      .catch(() => setStats({ total: 0, visible: 0, fullstack: 0, frontend: 0 }))
  }, [])

  const kpis = [
    { label: 'Total projects', value: stats?.total, icon: FolderKanban },
    { label: 'Visible', value: stats?.visible, icon: Eye },
    { label: 'Full stack', value: stats?.fullstack, icon: Layers },
    { label: 'Frontend', value: stats?.frontend, icon: Layers },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-medium tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your portfolio content.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects?new=1">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add project</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="mt-1 text-2xl font-medium tabular-nums">
                  {k.value ?? '—'}
                </p>
              </div>
              <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <k.icon className="size-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
