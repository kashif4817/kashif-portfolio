'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { siteConfig } from '@/data/site'
import Magnetic from './fx/Magnetic'
import { whenIntroReady } from './fx/Preloader'

const HeroShape = dynamic(() => import('./three/HeroShape'), { ssr: false })

export default function Hero() {
  const rootRef = useRef(null)
  const [show3d, setShow3d] = useState(false)

  // 3D only on desktop pointers without reduced motion — phones get the type
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (desktop && !reduced) setShow3d(true)
  }, [])

  // Intro: masked name lines, then the supporting elements
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let off
    const ctx = gsap.context(() => {
      gsap.set('.hero-line', { yPercent: 115 })
      gsap.set('.hero-el', { y: 28, opacity: 0 })
      const tl = gsap
        .timeline({ paused: true })
        .to('.hero-line', { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out' }, 0.1)
        .to('.hero-el', { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out' }, '-=0.7')
      off = whenIntroReady(() => tl.play())
    }, rootRef)
    return () => {
      off?.()
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (!show3d) return
    const el = rootRef.current?.querySelector('.hero-3d')
    if (el) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.4, delay: 0.5, ease: 'power2.out' })
  }, [show3d])

  const [first, last] = siteConfig.name.split(' ')

  return (
    <section id="home" ref={rootRef} className="relative flex min-h-screen flex-col overflow-hidden bg-ink">
      {show3d && (
        <div className="hero-3d pointer-events-none absolute inset-y-0 right-[-14%] z-0 hidden w-[62%] md:block" style={{ opacity: 0 }}>
          <HeroShape />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-center px-5 pb-12 pt-28 sm:px-10">
        <div className="hero-el inline-flex w-fit items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
          {siteConfig.availability}
        </div>

        <h1 className="mt-8 font-display font-bold uppercase leading-[0.88] tracking-tight">
          <span className="block overflow-hidden">
            <span className="hero-line block text-[clamp(3.2rem,13vw,10.5rem)] text-paper">{first}</span>
          </span>
          <span className="block overflow-hidden md:pl-[10vw]">
            <span className="hero-line text-stroke block text-[clamp(3.2rem,13vw,10.5rem)]">{last}</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <div className="hero-el max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
              Full Stack Developer — MERN · Next.js
            </p>
            <p className="mt-4 text-sm leading-relaxed text-dim sm:text-base">
              Building real-world web apps and SaaS products from {siteConfig.locationShort}. Every line
              intentional, every concept understood.
            </p>
          </div>

          <div className="hero-el flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-acid px-7 py-4 text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.03]"
              >
                View Projects ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Kashif_Mehmood_Resume.pdf"
                download="Kashif_Mehmood_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-xs font-bold uppercase tracking-wide text-paper transition-colors hover:border-paper"
              >
                Resume ↓
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-el relative z-10 border-t border-line">
        <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:px-10 sm:text-[11px]">
          <span>{siteConfig.location}</span>
          <span className="hidden sm:block">MERN · Next.js · SaaS</span>
          <span className="flex items-center gap-2">
            Scroll <span className="inline-block animate-bounce">↓</span>
          </span>
        </div>
      </div>
    </section>
  )
}
