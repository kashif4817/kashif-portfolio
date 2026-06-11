'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Delete } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const PIN_LENGTH = 4

export default function AdminLoginPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [shake, setShake] = useState(false)

  const submit = useCallback(
    async (value) => {
      setSubmitting(true)
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: value }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || 'Incorrect PIN.')
        }
        sessionStorage.setItem('kp_admin', '1')
        const params = new URLSearchParams(window.location.search)
        const from = params.get('from')
        router.replace(from && from.startsWith('/admin') ? from : '/admin')
      } catch (err) {
        toast.error(err.message || 'Incorrect PIN.')
        setShake(true)
        setTimeout(() => setShake(false), 400)
        setPin('')
        setSubmitting(false)
      }
    },
    [router],
  )

  const press = useCallback(
    (digit) => {
      if (submitting) return
      if (pin.length >= PIN_LENGTH) return
      const next = pin + digit
      setPin(next)
      if (next.length === PIN_LENGTH) submit(next)
    },
    [submitting, pin, submit],
  )

  const [activeKey, setActiveKey] = useState(null)

  const clear = useCallback(() => setPin(''), [])
  const backspace = useCallback(() => setPin((p) => p.slice(0, -1)), [])

  const flashKey = useCallback((k) => {
    setActiveKey(k)
    setTimeout(() => setActiveKey(null), 120)
  }, [])

  // Physical keyboard support with visual feedback
  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') { press(e.key); flashKey(e.key) }
      else if (e.key === 'Backspace') { backspace(); flashKey('backspace') }
      else if (e.key === 'Escape') { clear(); flashKey('clear') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press, backspace, clear, flashKey])

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  return (
    <div className="admin-root flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-xs">
        {/* Brand mark */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LockKeyhole className="size-6" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Admin access</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            Enter your {PIN_LENGTH}-digit PIN
          </p>
        </div>

        {/* PIN dots */}
        <div
          className={cn(
            'mb-8 flex items-center justify-center gap-3',
            shake && 'animate-[shake_0.4s_ease]',
          )}
        >
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'size-3 rounded-full border transition-colors',
                i < pin.length
                  ? 'border-primary bg-primary'
                  : 'border-border bg-transparent',
              )}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {keys.map((k) => (
            <KeyButton key={k} onClick={() => press(k)} disabled={submitting} active={activeKey === k}>
              {k}
            </KeyButton>
          ))}
          <button
            type="button"
            onClick={clear}
            disabled={submitting}
            className={cn(
              'flex h-16 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent disabled:opacity-50',
              activeKey === 'clear' && 'bg-accent scale-[0.97]',
            )}
          >
            Clear
          </button>
          <KeyButton onClick={() => press('0')} disabled={submitting} active={activeKey === '0'}>
            0
          </KeyButton>
          <button
            type="button"
            onClick={backspace}
            disabled={submitting}
            aria-label="Delete last digit"
            className={cn(
              'flex h-16 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent disabled:opacity-50',
              activeKey === 'backspace' && 'bg-accent scale-[0.97]',
            )}
          >
            <Delete className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function KeyButton({ children, onClick, disabled, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-16 items-center justify-center rounded-lg border border-border bg-card text-xl font-medium text-card-foreground shadow-sm transition-colors hover:bg-accent active:scale-[0.98] disabled:opacity-50',
        active && 'bg-accent scale-[0.97]',
      )}
    >
      {children}
    </button>
  )
}
