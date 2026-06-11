// ─────────────────────────────────────────────────────────────
// Single source of truth for the public site's content.
// Edit values here once — Navbar, Footer, Contact, Hero, About, and SEO
// metadata all read from this object (no more copy-pasted arrays).
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Kashif Mehmood',
  role: 'Full Stack Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kashifmehmood.vercel.app',

  description:
    'Full Stack Web Developer specializing in the MERN stack and Next.js. Building real-world web apps and SaaS products. Open to junior roles & internships.',

  keywords: [
    'Kashif Mehmood',
    'Full Stack Developer',
    'MERN Stack',
    'Next.js Developer',
    'React Developer',
    'Web Developer Pakistan',
  ],

  // TODO: confirm the email you want shown publicly. This replaced the
  // previous "0112kashif@email.com", which was not a deliverable address.
  email: 'info@airoxlab.com',
  phone: '+92 317 1640134',
  phoneRaw: '+923171640134',
  whatsapp: '923171640134',

  location: 'Bhakkar, Punjab, Pakistan',
  locationShort: 'Pakistan',
  education: 'BSSE',

  availability: 'Available for Junior Roles & Freelance',

  socials: {
    github: 'https://github.com/kashif4817',
    githubUser: '@kashif4817',
    linkedin: 'https://linkedin.com/in/kashif-mehmood-dev',
    linkedinUser: 'kashif-mehmood-dev',
  },
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '1+', label: 'Yr Experience' },
  { value: '6+', label: 'Projects Built' },
  { value: 'SaaS', label: 'Products Shipped' },
  { value: 'A+', label: 'Academic Grade' },
]
