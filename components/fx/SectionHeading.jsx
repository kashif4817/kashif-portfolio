'use client'
import { Reveal, Lines } from './Reveal'

// Consistent section opener: "(01) LABEL ————" + big display title.
export default function SectionHeading({ index, label, title, className = '' }) {
  return (
    <div className={className}>
      <Reveal y={24}>
        <div className="flex items-center gap-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-dim">
          <span className="text-acid">({index})</span>
          <span>{label}</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
      </Reveal>
      {title && (
        <Lines
          as="h2"
          className="font-display font-bold uppercase leading-[0.95] tracking-tight text-paper text-[clamp(2.4rem,6.5vw,5rem)] mt-6"
        >
          {title}
        </Lines>
      )}
    </div>
  )
}
