-- ─────────────────────────────────────────────────────────────
-- Portfolio: seed projects
-- Run AFTER schema.sql.
-- Safe to re-run — skipped if the projects table already has rows.
-- Images are sourced from Unsplash (high-quality, relevant photos).
-- ─────────────────────────────────────────────────────────────

do $$
begin
  if not exists (select 1 from public.projects limit 1) then

    insert into public.projects
      (title, badge, description, tech, link, github, images, category, featured, sort_order)
    values

      -- ── Full Stack ────────────────────────────────────────────

      (
        'Ecommerce Web App',
        'Full Stack',
        'Full stack ecommerce app with complete auth system (JWT, OTP, bcrypt), REST APIs, rate limiting, Axios interceptors, and protected routes.',
        ARRAY['Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'JWT'],
        'https://farhan-ecommrace.vercel.app/',
        'https://github.com/kashif4817/Farhan-Ecommrace',
        ARRAY[
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=800&q=80'
        ],
        'fullstack', true, 1
      ),

      (
        'Ecommerce Admin Panel',
        'Full Stack',
        'Admin dashboard for the ecommerce platform with role-based access control, product and order management, and protected admin routes.',
        ARRAY['Next.js', 'React', 'Node.js', 'PostgreSQL', 'JWT'],
        'https://farhan-admin-pannel.vercel.app/',
        'https://github.com/kashif4817/farhan-admin-pannel',
        ARRAY[
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
        ],
        'fullstack', true, 2
      ),

      (
        'BizPOS',
        'SaaS — Internship',
        'SaaS-based Point of Sale system built during internship at Airoxlab using Next.js. Designed for real business environments with inventory and billing management.',
        ARRAY['Next.js', 'React', 'JavaScript'],
        'https://github.com/kashif4817',
        null,
        ARRAY[
          'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80'
        ],
        'fullstack', true, 3
      ),

      -- ── Frontend ──────────────────────────────────────────────

      (
        'Pixel Nest',
        'Frontend',
        'A project showcase platform with modern UI, clean card layouts, and fully responsive design built with HTML, Tailwind CSS and JavaScript.',
        ARRAY['HTML', 'Tailwind CSS', 'JavaScript'],
        'https://pixel-next.netlify.app/',
        'https://github.com/Rashid4817/CodeVault---Project-Showcase',
        ARRAY[
          'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
        ],
        'frontend', true, 4
      ),

      (
        'PowerFit Gym',
        'Frontend',
        'Fitness and gym landing page with bold design, workout plans, membership sections, and responsive layout built with HTML, Tailwind CSS and JavaScript.',
        ARRAY['HTML', 'Tailwind CSS', 'JavaScript'],
        'https://powerfit-gym-mi.netlify.app/',
        'https://github.com/Rashid4817/PowerFit-Gym---Transform-Your-Body-Mind',
        ARRAY[
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'
        ],
        'frontend', true, 5
      ),

      (
        'Glamour Haven',
        'Frontend',
        'Luxury beauty salon and spa website with elegant visuals, service showcase, and responsive layout built with HTML, Tailwind CSS and JavaScript.',
        ARRAY['HTML', 'Tailwind CSS', 'JavaScript'],
        'https://glamour-haven-luxury-beauty-salon-s.netlify.app/',
        'https://github.com/Rashid4817/Glamour-Haven---Luxury-Beauty-Salon-Spa',
        ARRAY[
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80'
        ],
        'frontend', true, 6
      );

  end if;
end $$;
