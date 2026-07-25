'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { siteConfig } from '@/data/site'

export const PRELOADER_DONE_EVENT = 'km:preloader-done'

// Run cb once the intro may start (immediately if the preloader already
// finished or was skipped this session). Returns an unsubscribe fn.
export function whenIntroReady(cb) {
  if (typeof window === 'undefined') return () => {}
  if (window.__kmPreloaderDone) {
    cb()
    return () => {}
  }
  const handler = () => cb()
  window.addEventListener(PRELOADER_DONE_EVENT, handler, { once: true })
  return () => window.removeEventListener(PRELOADER_DONE_EVENT, handler)
}

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('km-preloader')

    const finish = () => {
      window.__kmPreloaderDone = true
      window.__kmScrollLocked = false
      window.dispatchEvent(new Event(PRELOADER_DONE_EVENT))
      window.dispatchEvent(new Event('km:scroll-start'))
      document.documentElement.style.overflow = ''
    }

    if (seen || reduced) {
      setVisible(false)
      finish()
      return
    }

    sessionStorage.setItem('km-preloader', '1')
    window.__kmScrollLocked = true
    window.dispatchEvent(new Event('km:scroll-stop'))
    document.documentElement.style.overflow = 'hidden'

    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false)
          finish()
        },
      })
      tl.to(counter, {
        v: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`
        },
      })
        .to(rootRef.current.children, { yPercent: -12, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.15')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  if (!visible) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-ink text-paper flex flex-col justify-between px-5 sm:px-10 py-8">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-dim">
        <span>{siteConfig.name}</span>
        <span className="hidden sm:block">Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim max-w-[14rem] leading-relaxed">
          Full stack developer — Pakistan
        </p>
        <span ref={countRef} className="font-display font-bold text-[clamp(4rem,16vw,10rem)] leading-none tabular-nums">
          000
        </span>
      </div>

      <div className="h-px w-full bg-line overflow-hidden">
        <div ref={barRef} className="h-full w-full bg-acid origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
