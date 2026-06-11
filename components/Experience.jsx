'use client'
import { useEffect, useRef } from 'react'

export default function Experience() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      title: 'Junior Web Developer Intern',
      company: 'Airoxlab',
      type: 'On-site · Internship',
      duration: 'Aug 2025 – Oct 2025',
      points: [
        'Built SaaS products BizPOS and ERP System using Next.js for real business clients',
        'Worked in a professional on-site environment, meeting deadlines and collaborating with a team',
        'Gained hands-on experience with React-based architecture and component-driven development',
      ],
      tags: ['Next.js', 'React', 'JavaScript', 'SaaS', 'REST APIs'],
    },
    {
      title: 'Junior Web Developer',
      company: 'Airoxlab',
      type: 'On-site · Full-time',
      duration: 'Nov 2025 – Present',
      points: [
        'Promoted to full-time role after internship, taking ownership of key frontend modules',
        'Developed and maintained scalable web applications for business clients using Next.js and React',
        'Collaborated closely with backend and design teams to deliver production-ready features on schedule',
      ],
      tags: ['Next.js', 'React', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    },
  ]

  return (
    <section id="experience" className="py-12 sm:py-16 bg-gray-50 dark:bg-[#080d14]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="section-animate">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">Work History</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">Experience</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 sm:pl-12">
              <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 to-transparent dark:from-blue-400" />
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-[#080d14] shadow-md shadow-blue-500/30" />
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">{exp.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-blue-500 dark:text-blue-400 font-semibold text-sm">{exp.company}</span>
                            <span className="text-gray-300 dark:text-gray-600">·</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{exp.type}</span>
                          </div>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium border border-blue-100 dark:border-blue-500/20">
                          {exp.duration}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{point}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                        {exp.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}