'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Projects({ projects: incoming }) {
  const ref = useRef(null)

  const projects = (Array.isArray(incoming) ? incoming : []).filter((p) => p.featured !== false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const fullstack = projects.filter((p) => p.category === 'fullstack')
  const frontend = projects.filter((p) => p.category === 'frontend')

  return (
    <section id="projects" className="py-12 sm:py-16 bg-white dark:bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="section-animate">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">
              What I have Built
            </p>
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            {projects.length > 0 && (
              <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                {fullstack.length > 0 && ` · ${fullstack.length} full stack`}
                {frontend.length > 0 && ` · ${frontend.length} frontend`}
              </p>
            )}
          </div>

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-4xl mb-4">🚧</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet. Add some from the admin panel.</p>
            </div>
          )}

          {/* Full Stack row */}
          {fullstack.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                  Full Stack
                </span>
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                <span className="text-xs text-gray-400 font-mono">← → to scroll</span>
              </div>
              <HorizontalScroller projects={fullstack} />
            </div>
          )}

          {/* Frontend row */}
          {frontend.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  Frontend — HTML / CSS / JS
                </span>
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                <span className="text-xs text-gray-400 font-mono">← → to scroll</span>
              </div>
              <HorizontalScroller projects={frontend} />
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

function HorizontalScroller({ projects }) {
  const scrollRef = useRef(null)

  const scroll = useCallback((dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }, [])

  return (
    <div className="relative group/scroller">
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-5 top-[calc(50%-1.5rem)] z-10 flex size-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-600 dark:text-gray-300 opacity-0 group-hover/scroller:opacity-100 transition-opacity duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-5" />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); scroll(-1) }
          if (e.key === 'ArrowRight') { e.preventDefault(); scroll(1) }
        }}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 focus:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div key={p.id ?? p.title} className="snap-start shrink-0 w-[300px] sm:w-[320px]">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute -right-5 top-[calc(50%-1.5rem)] z-10 flex size-9 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-600 dark:text-gray-300 opacity-0 group-hover/scroller:opacity-100 transition-opacity duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        aria-label="Scroll right"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

function ProjectCard({ project }) {
  const router = useRouter()
  const link = project.link || ''
  const isGithubLink = link.includes('github.com')
  const isLive = Boolean(link) && !isGithubLink
  const gradient = project.gradient || 'from-emerald-500 to-teal-600'
  const icon = project.icon || project.title?.[0]?.toUpperCase() || 'P'

  const images = Array.isArray(project.images) && project.images.length
    ? project.images
    : project.image
      ? [project.image]
      : []
  const [imgIdx, setImgIdx] = useState(0)
  const currentImage = images[imgIdx] || null

  const prevImg = (e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length) }
  const nextImg = (e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % images.length) }

  const goToDetail = () => {
    if (project.id && !project.id.startsWith('fallback-')) {
      router.push(`/projects/${project.id}`)
    }
  }

  return (
    <div
      onClick={goToDetail}
      className="group flex flex-col h-full rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827] overflow-hidden hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 cursor-pointer"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={`${project.title} — image ${imgIdx + 1}`}
              fill
              sizes="320px"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 text-lg leading-none"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 text-lg leading-none"
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                      className={`size-1.5 rounded-full transition-colors ${i === imgIdx ? 'bg-white' : 'bg-white/40'}`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">{icon}</span>
            </div>
          </div>
        )}

        {project.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-black/40 text-white backdrop-blur-sm">
            {project.badge}
          </span>
        )}

        {isLive && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-green-500/30 text-green-300 backdrop-blur-sm border border-green-400/40">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1.5">{project.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-3 line-clamp-3">
          {project.description}
        </p>

        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}

          {project.github && isLive && (
            <span className="text-gray-200 dark:text-gray-700">|</span>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                isGithubLink
                  ? 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  : 'text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {isGithubLink ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
              {isGithubLink ? 'View on GitHub' : 'Live Demo'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
