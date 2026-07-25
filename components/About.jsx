'use client'
import { siteConfig, stats } from '@/data/site'
import SectionHeading from './fx/SectionHeading'
import { Reveal, Lines } from './fx/Reveal'
import Magnetic from './fx/Magnetic'

const tags = ['MERN Stack', 'Next.js', 'REST APIs', 'JWT Auth', 'Supabase']

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading index="01" label="About" />

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-10">
          {/* Statement */}
          <div className="md:col-span-7">
            <Lines
              as="p"
              className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-medium leading-[1.25] text-paper"
            >
              I specialize in the MERN stack and build full-stack web apps from scratch — every line
              intentional, every concept understood. Currently open to junior roles, internships and
              freelance work.
            </Lines>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-dim transition-colors hover:border-acid hover:text-acid"
                >
                  {tag}
                </span>
              ))}
            </Reveal>

            <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-acid"
                >
                  GitHub ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-paper transition-colors hover:border-paper"
                >
                  LinkedIn ↗
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* Stats + facts */}
          <div className="md:col-span-4 md:col-start-9">
            <div>
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="flex items-baseline justify-between border-t border-line py-5 last:border-b">
                    <span className="font-display text-3xl font-bold text-acid sm:text-4xl">{s.value}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10 space-y-3 font-mono text-xs uppercase tracking-[0.15em] text-dim">
              <p className="flex justify-between gap-4">
                <span className="text-paper/60">Based in</span>
                <span className="text-right">{siteConfig.location}</span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-paper/60">Education</span>
                <span>{siteConfig.education}</span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-paper/60">Status</span>
                <span className="text-acid">Open to work</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
