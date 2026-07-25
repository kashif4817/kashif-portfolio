'use client'
import {
  SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiGithub, SiJsonwebtokens, SiSupabase, SiPostman,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import SectionHeading from './fx/SectionHeading'
import Marquee from './fx/Marquee'

const skills = [
  { name: 'JavaScript', level: 'Intermediate', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'React', level: 'Intermediate', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Next.js', level: 'Intermediate', icon: <SiNextdotjs />, color: '#e8e8e4' },
  { name: 'Node.js', level: 'Advanced', icon: <SiNodedotjs />, color: '#339933' },
  { name: 'Express', level: 'Advanced', icon: <SiExpress />, color: '#b5b5af' },
  { name: 'MongoDB', level: 'Intermediate', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Tailwind', level: 'Advanced', icon: <SiTailwindcss />, color: '#38BDF8' },
  { name: 'Git & GitHub', level: 'Intermediate', icon: <SiGithub />, color: '#e8e8e4' },
  { name: 'REST APIs', level: 'Advanced', icon: <TbApi />, color: '#3B82F6' },
  { name: 'JWT Auth', level: 'Intermediate', icon: <SiJsonwebtokens />, color: '#8B5CF6' },
  { name: 'Supabase', level: 'Intermediate', icon: <SiSupabase />, color: '#3ECF8E' },
  { name: 'Postman', level: 'Intermediate', icon: <SiPostman />, color: '#FF6C37' },
]

function SkillItem({ skill }) {
  return (
    <span className="flex items-center gap-4 px-6 md:gap-6 md:px-10">
      <span className="text-3xl md:text-5xl" style={{ color: skill.color }} aria-hidden="true">
        {skill.icon}
      </span>
      <span className="font-display text-4xl font-bold uppercase leading-none text-paper/90 md:text-6xl">
        {skill.name}
      </span>
      <sup className="-translate-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim md:-translate-y-5">
        {skill.level}
      </sup>
      <span className="pl-6 text-lg text-acid md:pl-10" aria-hidden="true">✦</span>
    </span>
  )
}

export default function Skills() {
  const rowOne = skills.slice(0, 6)
  const rowTwo = skills.slice(6)

  return (
    <section id="skills" className="border-t border-line bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10">
        <SectionHeading index="02" label="Skills" title="What I work with" />
      </div>

      <div className="mt-16 border-y border-line py-8 md:py-10">
        <Marquee duration={36}>
          {rowOne.map((s) => (
            <SkillItem key={s.name} skill={s} />
          ))}
        </Marquee>
        <div className="mt-8 md:mt-10">
          <Marquee duration={36} reverse>
            {rowTwo.map((s) => (
              <SkillItem key={s.name} skill={s} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
