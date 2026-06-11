'use client'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/data/site'

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

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
    {
      label: 'GitHub',
      href: siteConfig.socials.github,
      username: siteConfig.socials.githubUser,
      desc: 'See my code',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      bg: 'bg-gray-100 dark:bg-gray-800',
      iconColor: 'text-gray-700 dark:text-gray-300',
      hover: 'hover:border-gray-400 dark:hover:border-gray-500',
    },
    {
      label: 'LinkedIn',
      href: siteConfig.socials.linkedin,
      username: siteConfig.socials.linkedinUser,
      desc: 'Connect with me',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:border-blue-400 dark:hover:border-blue-500',
    },
    {
      label: 'Email',
      href: `mailto:${siteConfig.email}`,
      username: siteConfig.email,
      desc: 'Send me a mail',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-red-50 dark:bg-red-500/10',
      iconColor: 'text-red-500 dark:text-red-400',
      hover: 'hover:border-red-300 dark:hover:border-red-500',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${siteConfig.whatsapp}`,
      username: siteConfig.phone,
      desc: 'Chat on WhatsApp',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      bg: 'bg-green-50 dark:bg-green-500/10',
      iconColor: 'text-green-600 dark:text-green-400',
      hover: 'hover:border-green-400 dark:hover:border-green-500',
    },
  ]

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 transition-all text-sm'

  return (
    <section id="contact" className="py-12 sm:py-16 bg-gray-50 dark:bg-[#080d14]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="section-animate">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">Let's Talk</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto text-sm">
              Have a project in mind? I build fast, clean, and scalable web apps — from landing pages to full SaaS products. Let's turn your idea into something real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* Left — Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="What would you like to discuss?" className={inputClass + ' resize-none'} required />
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                onClick={status === 'error' ? () => setStatus(null) : undefined}
                className="w-full py-3.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 disabled:opacity-70 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                ) : status === 'sent' ? (
                  <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Message Sent!</>
                ) : status === 'error' ? (
                  'Failed — Try Again'
                ) : 'Send Message'}
              </button>
            </form>

            {/* Right — Info Card */}
            <div className="flex flex-col gap-5">

              {/* Info */}
              <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-1">{siteConfig.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {siteConfig.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">{siteConfig.availability}</span>
                </div>
              </div>

              {/* Find Me On */}
              <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono mb-4">Find me on</p>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 ${s.hover} hover:-translate-y-0.5 transition-all group`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.iconColor} flex items-center justify-center shrink-0`}>
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{s.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{s.username}</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-600 group-hover:text-blue-500 transition-colors shrink-0">{s.desc} →</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}