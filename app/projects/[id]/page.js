import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProjectById } from '@/lib/projects'
import { ProjectDetailGallery } from '@/components/ProjectDetailGallery'

export async function generateMetadata({ params }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return { title: 'Project not found' }
  return { title: project.title, description: project.description }
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  const link = project.link || ''
  const isGithubLink = link.includes('github.com')
  const isLive = Boolean(link) && !isGithubLink
  const images = project.images || (project.image ? [project.image] : [])

  return (
    <main className="min-h-dvh bg-ink text-paper antialiased">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">

        {/* Back */}
        <Link
          href="/#projects"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-paper"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </Link>

        {/* Title + badges */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {project.badge && (
              <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                {project.badge}
              </span>
            )}
            {isLive && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-acid">
                <span className="size-1.5 animate-pulse rounded-full bg-acid" />
                Live
              </span>
            )}
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
              {project.category === 'frontend' ? 'Frontend' : 'Full Stack'}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-paper sm:text-5xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-dim">
              {project.description}
            </p>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left: gallery */}
          <div className="lg:col-span-2">
            {images.length > 0 ? (
              <ProjectDetailGallery images={images} title={project.title} />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-md border border-line bg-ink-2 font-mono text-xs uppercase tracking-[0.2em] text-dim">
                No preview available
              </div>
            )}
          </div>

          {/* Right: meta sidebar */}
          <div className="flex flex-col gap-5">

            {/* Links */}
            {(isLive || project.github) && (
              <div className="space-y-3 rounded-md border border-line bg-ink-2 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Links</p>
                <div className="flex flex-col gap-2">
                  {isLive && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-acid px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
                    >
                      <ExternalLink className="size-4 shrink-0" />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-xs font-bold uppercase tracking-wide text-paper transition-colors hover:border-paper"
                    >
                      <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tech stack */}
            {project.tech?.length > 0 && (
              <div className="rounded-md border border-line bg-ink-2 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  )
}
