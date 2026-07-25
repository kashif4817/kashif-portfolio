'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SectionHeading from './fx/SectionHeading'
import { Reveal } from './fx/Reveal'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'frontend', label: 'Frontend' },
]

export default function Projects({ projects: incoming }) {
  const [filter, setFilter] = useState('all')

  const projects = (Array.isArray(incoming) ? incoming : []).filter((p) => p.featured !== false)
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="04" label="Selected Work" title="Projects" className="flex-1" />
          <Reveal delay={0.15} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  filter === f.value
                    ? 'border-acid bg-acid text-ink'
                    : 'border-line text-dim hover:border-paper hover:text-paper'
                }`}
              >
                {f.label}
              </button>
            ))}
          </Reveal>
        </div>

        {visible.length === 0 && (
          <p className="mt-20 text-center font-mono text-xs uppercase tracking-[0.25em] text-dim">
            {projects.length === 0 ? 'No projects yet — add some from the admin panel.' : 'Nothing in this category yet.'}
          </p>
        )}

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {visible.map((project, i) => (
            <Reveal key={project.id ?? project.title} className={i % 2 === 1 ? 'md:mt-24' : ''}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const router = useRouter()
  const link = project.link || ''
  const isGithubLink = link.includes('github.com')
  const isLive = Boolean(link) && !isGithubLink
  const image = project.image || null
  const hasDetail = project.id && !String(project.id).startsWith('fallback-')

  const goToDetail = () => {
    if (hasDetail) router.push(`/projects/${project.id}`)
  }

  return (
    <article
      onClick={goToDetail}
      className={`group ${hasDetail ? 'cursor-pointer' : ''}`}
      data-cursor="hover"
    >
      {/* Image — 16:9 frame matches the usual uploads exactly; taller
          screenshots pan top→bottom on hover (see .shot-frame in globals) */}
      <div className="shot-frame relative aspect-video overflow-hidden rounded-md border border-line bg-ink-2">
        {image ? (
          <Image
            src={image}
            alt={project.title}
            width={1000}
            height={1778}
            sizes="(min-width: 768px) 45vw, 92vw"
            className="shot-img absolute left-0 top-0 h-auto min-h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-8xl font-bold uppercase text-paper/10">
              {project.icon || project.title?.[0] || 'P'}
            </span>
          </div>
        )}

        {/* Hover CTA — corner badge so it never hides the screenshot */}
        {hasDetail && (
          <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-acid font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
              View ↗
            </span>
          </div>
        )}

        {project.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur-sm">
            {project.badge}
          </span>
        )}
        {isLive && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-acid backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
            Live
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <h3 className="flex items-baseline gap-3 font-display text-xl font-bold uppercase leading-tight text-paper transition-colors group-hover:text-acid sm:text-2xl">
          <span className="font-mono text-xs font-normal text-dim">0{index + 1}</span>
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          {project.category === 'frontend' ? 'Frontend' : 'Full Stack'}
        </span>
      </div>

      {project.description && (
        <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-dim">{project.description}</p>
      )}

      {project.tech?.length > 0 && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-dim/70">
          {project.tech.slice(0, 5).join(' / ')}
          {project.tech.length > 5 && ` +${project.tech.length - 5}`}
        </p>
      )}

      <div className="mt-4 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="nav-link font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-paper"
          >
            GitHub ↗
          </a>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="nav-link font-mono text-[11px] uppercase tracking-[0.2em] text-acid"
          >
            {isGithubLink ? 'View on GitHub ↗' : 'Live Demo ↗'}
          </a>
        )}
      </div>
    </article>
  )
}
