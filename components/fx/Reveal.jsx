'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Fade-up on scroll.
export function Reveal({ children, delay = 0, y = 48, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Masked line-by-line text reveal (award-site staple).
export function Lines({ children, as: Tag = 'p', className = '', delay = 0, stagger = 0.09 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    if (!el) return

    let split
    let tween
    let cancelled = false

    // Split after fonts load so line breaks are final
    document.fonts.ready.then(() => {
      if (cancelled) return
      split = new SplitType(el, { types: 'lines' })
      split.lines.forEach((line) => {
        const mask = document.createElement('div')
        mask.style.overflow = 'hidden'
        line.parentNode.insertBefore(mask, line)
        mask.appendChild(line)
      })
      tween = gsap.fromTo(
        split.lines,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          delay,
          stagger,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    })

    return () => {
      cancelled = true
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert()
    }
  }, [delay, stagger])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
