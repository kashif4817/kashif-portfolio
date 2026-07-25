'use client'
import { useState } from 'react'
import { siteConfig } from '@/data/site'
import SectionHeading from './fx/SectionHeading'
import { Reveal, Lines } from './fx/Reveal'
import Magnetic from './fx/Magnetic'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const socials = [
    { label: 'GitHub', href: siteConfig.socials.github, username: siteConfig.socials.githubUser },
    { label: 'LinkedIn', href: siteConfig.socials.linkedin, username: siteConfig.socials.linkedinUser },
    { label: 'WhatsApp', href: `https://wa.me/${siteConfig.whatsapp}`, username: siteConfig.phone },
    { label: 'Email', href: `mailto:${siteConfig.email}`, username: siteConfig.email },
  ]

  const inputClass =
    'w-full border-0 border-b border-line bg-transparent py-3.5 text-paper placeholder:text-dim/50 focus:border-acid focus:outline-none focus:ring-0 transition-colors text-sm'

  return (
    <section id="contact" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading index="06" label="Contact" />

        <Lines
          as="h2"
          className="mt-6 font-display font-bold uppercase leading-[0.95] tracking-tight text-paper text-[clamp(2.4rem,7vw,6rem)]"
        >
          Let&apos;s build something real
        </Lines>

        <Reveal delay={0.2} className="mt-10">
          <Magnetic strength={0.15} className="max-w-full">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block break-all font-display text-[clamp(1.3rem,4vw,3rem)] font-medium text-dim underline decoration-line decoration-1 underline-offset-8 transition-colors hover:text-acid hover:decoration-acid"
            >
              {siteConfig.email}
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="contact-name" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What would you like to discuss?"
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                onClick={status === 'error' ? () => setStatus(null) : undefined}
                className="w-full rounded-full border border-paper py-4 text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-acid hover:bg-acid hover:text-ink disabled:opacity-60"
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'sent'
                    ? 'Message sent ✓'
                    : status === 'error'
                      ? 'Failed — try again'
                      : 'Send message ↗'}
              </button>
            </form>
          </Reveal>

          {/* Socials + availability */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-acid" />
              <span className="text-paper">{siteConfig.availability}</span>
            </div>

            <div className="mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border-t border-line py-5 transition-colors last:border-b hover:bg-ink-2"
                >
                  <span className="font-display text-lg font-bold uppercase text-paper transition-transform duration-300 group-hover:translate-x-2">
                    {s.label}
                  </span>
                  <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.15em] text-dim sm:block">
                    {s.username}
                  </span>
                  <span className="text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-acid" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              {siteConfig.location} · {siteConfig.phone}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
