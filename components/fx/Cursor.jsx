'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Trailing ring + dot cursor. Desktop pointers only; the native cursor
// stays visible so usability never suffers.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    let shown = false
    const move = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      if (!shown) {
        shown = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
      }
    }
    const over = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor]')
      gsap.to(ring, { scale: interactive ? 1.9 : 1, duration: 0.3, ease: 'power2.out' })
    }
    const leave = () => {
      shown = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="km-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="km-cursor-ring" aria-hidden="true" />
    </>
  )
}
