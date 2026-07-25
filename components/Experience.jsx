'use client'
import SectionHeading from './fx/SectionHeading'
import { Reveal } from './fx/Reveal'

const experiences = [
  {
    title: 'Junior Web Developer',
    company: 'Airoxlab',
    type: 'On-site · Full-time',
    duration: 'Nov 2025 — Present',
    points: [
      'Promoted to full-time role after internship, taking ownership of key frontend modules',
      'Developed and maintained scalable web applications for business clients using Next.js and React',
      'Collaborated closely with backend and design teams to deliver production-ready features on schedule',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'REST APIs', 'Tailwind CSS'],
  },
  {
    title: 'Junior Web Developer Intern',
    company: 'Airoxlab',
    type: 'On-site · Internship',
    duration: 'Aug 2025 — Oct 2025',
    points: [
      'Built SaaS products BizPOS and ERP System using Next.js for real business clients',
      'Worked in a professional on-site environment, meeting deadlines and collaborating with a team',
      'Gained hands-on experience with React-based architecture and component-driven development',
    ],
    tags: ['Next.js', 'React', 'JavaScript', 'SaaS', 'REST APIs'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading index="05" label="Work History" title="Experience" />

        <div className="mt-16">
          {experiences.map((exp) => (
            <Reveal key={exp.duration} y={32}>
              <div className="grid gap-4 border-t border-line py-10 last:border-b md:grid-cols-12 md:gap-6 md:py-12">
                <div className="md:col-span-3">
                  <p className="font-mono text-sm text-acid">{exp.duration}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-dim">{exp.type}</p>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-paper md:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-dim">@ {exp.company}</p>

                  <ul className="mt-6 space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-dim">
                        <span className="mt-0.5 shrink-0 text-acid" aria-hidden="true">—</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-dim/70">
                    {exp.tags.join(' · ')}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
