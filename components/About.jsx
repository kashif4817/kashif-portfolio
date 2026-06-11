"use client";
import { useEffect, useRef } from "react";
import { siteConfig, stats } from "@/data/site";

export default function About() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current?.classList.add("visible");
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-12 sm:py-24 bg-white dark:bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className="section-animate grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#111827] dark:to-[#0f1a2e] p-8 border border-blue-100 dark:border-gray-800">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-6 shadow-lg">
                <span className="font-display font-black text-4xl text-white">
                  K
                </span>
              </div>
              <div className="space-y-2">
                <div className="font-display font-bold text-xl text-gray-900 dark:text-white">
                  Kashif Mehmood
                </div>
                <div className="font-mono text-xs text-blue-500 dark:text-blue-400">
                  Full Stack Developer
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 pt-2 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {siteConfig.locationShort}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {siteConfig.education}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white dark:bg-[#0d1117]/60 rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700/50"
                  >
                    <div className="font-display font-bold text-xl text-blue-500">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-blue-500/10 dark:bg-blue-500/5 border border-blue-200/40 dark:border-blue-500/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-200/40 dark:border-indigo-500/10 -z-10" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-4">
              About Me
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-6 leading-tight">
              Passionate about building
              <span className="text-blue-500"> real-world</span> solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-base sm:text-lg">
              I specialize in the MERN stack and build full-stack web apps from
              scratch — every line intentional, every concept understood. I&apos;m
              actively looking for junior or internship roles to grow further.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "MERN Stack",
                "Next.js",
                "REST APIs",
                "JWT Auth",
                "Supabase",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all hover:-translate-y-0.5"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
