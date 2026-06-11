'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4, alpha: Math.random() * 0.5 + 0.1 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,179,237,${p.alpha})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-[#0d1117] dark:via-[#0f1a2e] dark:to-[#0d1117]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/8 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20 mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Open to Junior Roles &amp; Internships · Pakistan
        </div>
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white leading-[0.95] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Kashif<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500">Mehmood</span>
        </h1>
        <p className="font-mono text-sm sm:text-base text-blue-500 dark:text-blue-400 tracking-wider uppercase mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Full Stack Web Developer · MERN Stack · Next js
        </p>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Building real-world apps with React, Next.js, Node.js &amp; Express
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a href="#projects" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
            View Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5">
            Contact Me
          </a>
          <a
            href="/Kashif_Mehmood_Resume.pdf"
            download="Kashif_Mehmood_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
        </div>
        
      </div>
    </section>
  )
}
