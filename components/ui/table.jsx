import { cn } from '@/lib/utils'

// Compact, dense data table optimized for many rows.
function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn(
        'sticky top-0 z-10 bg-muted/60 backdrop-blur [&_tr]:border-b',
        className,
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        'h-9 px-3 text-left align-middle text-xs font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }) {
  return (
    <td
      className={cn('h-10 px-3 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
