'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mount once per page. Drives Lenis with GSAP's ticker so ScrollTrigger
// and smooth scroll share a single rAF loop.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links scroll through Lenis instead of jumping
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const hash = a.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72, duration: 1.1 })
    }
    document.addEventListener('click', onClick)

    // Preloader locks scrolling while it plays
    const stop = () => lenis.stop()
    const start = () => lenis.start()
    window.addEventListener('km:scroll-stop', stop)
    window.addEventListener('km:scroll-start', start)
    if (window.__kmScrollLocked) lenis.stop()

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('km:scroll-stop', stop)
      window.removeEventListener('km:scroll-start', start)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
