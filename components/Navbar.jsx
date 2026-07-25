'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { navLinks, siteConfig } from '@/data/site'
import Magnetic from './fx/Magnetic'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fullscreen menu timeline (mobile)
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const links = overlay.querySelectorAll('.menu-item')
    gsap.set(overlay, { yPercent: -100, autoAlpha: 0 })
    const tl = gsap
      .timeline({ paused: true })
      .to(overlay, { yPercent: 0, autoAlpha: 1, duration: 0.65, ease: 'power4.inOut' })
      .fromTo(
        links,
        { yPercent: 130 },
        { yPercent: 0, duration: 0.55, stagger: 0.05, ease: 'power4.out' },
        '-=0.2',
      )
    tlRef.current = tl
    return () => tl.kill()
  }, [])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (menuOpen) {
      window.dispatchEvent(new Event('km:scroll-stop'))
      tl.timeScale(1).play()
    } else if (tl.progress() > 0) {
      if (!window.__kmScrollLocked) window.dispatchEvent(new Event('km:scroll-start'))
      tl.timeScale(1.4).reverse()
    }
  }, [menuOpen])

  return (
    <header>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled && !menuOpen
            ? 'border-b border-line bg-ink/80 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-[4.5rem] sm:px-10">
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="relative z-50 font-display text-lg font-bold tracking-tight text-paper"
          >
            KM<span className="text-acid">©</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-paper px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-acid"
              >
                Let&apos;s talk
              </a>
            </Magnetic>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-paper transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li key={link.label} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="menu-item flex items-baseline gap-4 py-1.5 font-display text-4xl font-bold uppercase leading-none text-paper"
              >
                <span className="font-mono text-xs font-normal text-acid">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="overflow-hidden">
          <div className="menu-item flex flex-col gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.2em] text-dim">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-acid transition-colors">{siteConfig.email}</a>
            <div className="flex gap-6">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">GitHub ↗</a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">LinkedIn ↗</a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
