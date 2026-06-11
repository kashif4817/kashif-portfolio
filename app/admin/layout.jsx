import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="admin-root min-h-dvh bg-background text-foreground">
      {children}
      <Toaster position="top-center" />
    </div>
  )
}
