'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  PanelLeftClose,
  PanelLeft,
  Menu,
  Search,
  ArrowUpRight,
  LogOut,
  Plus,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
]

export function AdminShell({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('kp_admin')) {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [router])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('kp_admin')
    toast.success('Signed out')
    router.replace('/')
  }, [router])

  if (!checked) return null

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        pathname={pathname}
        onNavigate={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          onCollapse={() => setCollapsed((c) => !c)}
          collapsed={collapsed}
          onSearch={() => setCmdOpen(true)}
          onLogout={() => setConfirmOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      <CommandMenu
        open={cmdOpen}
        setOpen={setCmdOpen}
        router={router}
        onLogout={() => { setCmdOpen(false); setConfirmOpen(true) }}
      />

      {/* Sign-out confirmation */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>
              You'll need to enter your PIN again to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={logout}>
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Sidebar({ collapsed, mobileOpen, pathname, onNavigate }) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,transform] duration-200 shrink-0',
        // mobile drawer
        'fixed inset-y-0 left-0 z-50',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        // desktop: always visible, width depends on collapsed
        'md:static md:translate-x-0',
        collapsed ? 'md:w-16' : 'md:w-60',
        'w-60',
      )}
    >
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-display text-xs font-bold text-primary-foreground">
          KM
        </div>
        {!collapsed && (
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Portfolio Admin
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-2 py-2 overflow-y-auto">
        {NAV.map((item) => {
          const active =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                collapsed && 'md:justify-center md:px-0',
              )}
            >
              <item.icon className={cn('size-4 shrink-0', active && 'text-primary')} />
              <span className={cn(collapsed && 'md:hidden')}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <p
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground',
            collapsed && 'md:text-center',
          )}
        >
          {collapsed ? 'v1' : 'Portfolio CMS · v1'}
        </p>
      </div>
    </aside>
  )
}

function Topbar({ onMenu, onCollapse, collapsed, onSearch, onLogout }) {
  return (
    <header className="shrink-0 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={onCollapse}
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <PanelLeft className="size-5" />
        ) : (
          <PanelLeftClose className="size-5" />
        )}
      </Button>

      <button
        onClick={onSearch}
        className="flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent sm:max-w-xs"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
          <a href="/" target="_blank" rel="noreferrer">
            <ArrowUpRight className="size-4" />
            <span className="hidden sm:inline">View site</span>
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          aria-label="Sign out"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  )
}

function CommandMenu({ open, setOpen, router, onLogout }) {
  const go = (href) => {
    setOpen(false)
    router.push(href)
  }
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {NAV.map((item) => (
            <CommandItem
              key={item.href}
              value={item.label}
              onSelect={() => go(item.href)}
            >
              <item.icon />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="Add project"
            onSelect={() => go('/admin/projects?new=1')}
          >
            <Plus />
            Add project
          </CommandItem>
          <CommandItem
            value="View site"
            onSelect={() => {
              setOpen(false)
              window.open('/', '_blank')
            }}
          >
            <ArrowUpRight />
            View site
          </CommandItem>
          <CommandItem
            value="Sign out"
            onSelect={onLogout}
          >
            <LogOut />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
