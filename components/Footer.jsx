'use client'
import { useEffect, useState } from 'react'
import { siteConfig, navLinks } from '@/data/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [time, setTime] = useState('')

  // Local (Pakistan) time in the bottom bar — client-only to avoid hydration mismatch
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const contact = [
    { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}` },
    { label: 'WhatsApp ↗', href: `https://wa.me/${siteConfig.whatsapp}`, external: true },
    { label: 'GitHub ↗', href: siteConfig.socials.github, external: true },
    { label: 'LinkedIn ↗', href: siteConfig.socials.linkedin, external: true },
  ]

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        {/* Top */}
        <div className="grid gap-12 py-16 md:grid-cols-3">
          <div>
            <a href="#home" className="font-display text-2xl font-bold tracking-tight text-paper">
              KM<span className="text-acid">©</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              Full Stack Web Developer based in {siteConfig.locationShort}. Building real-world apps
              with the MERN stack.
            </p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
              Open to opportunities
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-dim">Navigation</p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="nav-link font-mono text-xs uppercase tracking-[0.2em] text-dim transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-dim">Contact</p>
            <ul className="mt-5 space-y-2.5">
              {contact.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="nav-link font-mono text-xs uppercase tracking-[0.15em] text-dim transition-colors hover:text-paper"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-dim/70">
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark — outlined so it stays visible on dim screens */}
        <div className="select-none overflow-hidden" aria-hidden="true">
          <p className="text-stroke whitespace-nowrap text-center font-display text-[clamp(4.5rem,19vw,15rem)] font-bold uppercase leading-[0.8] opacity-40">
            Kashif©
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim sm:flex-row sm:text-[11px]">
          <p>© {currentYear} {siteConfig.name}</p>
          <p suppressHydrationWarning>{siteConfig.locationShort} {time && `— ${time} PKT`}</p>
          <a href="#home" className="nav-link transition-colors hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
