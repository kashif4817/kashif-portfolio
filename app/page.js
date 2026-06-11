import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Services from '@/components/Services'
import { getPublicProjects } from '@/lib/projects'

// Re-fetch projects from the DB at most once a minute (ISR).
export const revalidate = 60

export default async function Home() {
  const projects = await getPublicProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0d1117] transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects projects={projects} />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
