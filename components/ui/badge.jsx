import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Neutral chrome + a deliberate, small functional-status palette.
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-border bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        muted: 'border-border bg-muted text-muted-foreground',
        // functional status — used ONLY to signal state
        success:
          'border-success-border bg-success text-success-foreground',
        warning:
          'border-warning-border bg-warning text-warning-foreground',
        danger: 'border-danger-border bg-danger text-danger-foreground',
        info: 'border-info-border bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({ className, variant, dot = false, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
