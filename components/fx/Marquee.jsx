'use client'

// Infinite marquee. Content is rendered twice; CSS shifts the track -50%.
export default function Marquee({ children, duration = 32, reverse = false, className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="marquee-track inline-flex items-center"
        style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="inline-flex items-center shrink-0">{children}</div>
        <div className="inline-flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
