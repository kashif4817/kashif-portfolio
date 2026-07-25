'use client'
import SectionHeading from './fx/SectionHeading'
import { Reveal } from './fx/Reveal'
import Magnetic from './fx/Magnetic'

const services = [
  {
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end MERN stack applications — from database schema to polished UI — built clean and ready to scale.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    title: 'Next.js Development',
    desc: 'Fast, SEO-friendly web apps with server-side rendering, file-based routing, and optimized performance.',
    tags: ['Next.js', 'SSR', 'SEO', 'Tailwind CSS'],
  },
  {
    title: 'REST API Development',
    desc: 'Secure, well-structured REST APIs with proper authentication, validation, and clean endpoint design.',
    tags: ['Express.js', 'JWT Auth', 'REST', 'Postman'],
  },
  {
    title: 'SaaS Product Development',
    desc: 'Built real SaaS products like BizPOS and ERP systems. I understand what it takes to ship a product for real users.',
    tags: ['SaaS', 'Dashboard', 'Multi-user', 'Auth'],
  },
  {
    title: 'Landing Pages & Portfolios',
    desc: 'Responsive, animated landing pages and portfolio sites that look sharp on every screen size.',
    tags: ['React', 'Tailwind CSS', 'Animations', 'Responsive'],
  },
  {
    title: 'Bug Fixing & Code Review',
    desc: 'Stuck on a bug or need a second pair of eyes on your codebase? I dig in, find the root cause, and fix it properly.',
    tags: ['Debugging', 'Refactoring', 'Code Review', 'Optimization'],
  },
]

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading index="03" label="Services" title="What I can do for you" />

        <div className="mt-16">
          {services.map((s, i) => (
            <Reveal key={s.title} y={32}>
              <div className="group grid gap-3 border-t border-line py-8 last:border-b md:grid-cols-12 md:items-baseline md:gap-6 md:py-10">
                <span className="font-mono text-sm text-acid md:col-span-1">0{i + 1}</span>

                <h3 className="font-display text-2xl font-bold uppercase leading-tight text-paper transition-all duration-300 group-hover:translate-x-2 group-hover:text-acid md:col-span-5 md:text-3xl">
                  {s.title}
                  <span className="ml-3 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                    ↗
                  </span>
                </h3>

                <div className="md:col-span-6">
                  <p className="max-w-xl text-sm leading-relaxed text-dim">{s.desc}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-dim/70">
                    {s.tags.join(' · ')}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">Need something built?</p>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-acid px-8 py-4 text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.03]"
            >
              Get in touch ↗
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
