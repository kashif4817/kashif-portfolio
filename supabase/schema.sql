-- ─────────────────────────────────────────────────────────────
-- Portfolio: table definitions
-- Run in Supabase → SQL Editor → New query → Run.
-- For seed data run seed.sql after this.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ── Projects ──────────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  badge       text,
  description text,
  tech        text[] not null default '{}',
  link        text,
  github      text,
  images      text[] not null default '{}',
  category    text not null default 'fullstack'
                check (category in ('fullstack', 'frontend')),
  featured    boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();

alter table public.projects enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects"
  on public.projects for select
  to anon, authenticated
  using (true);

create index if not exists projects_sort_idx
  on public.projects (sort_order asc, created_at desc);

-- ── Migration: single image → images array ────────────────────
-- Safe to run even if already migrated — checks column existence first.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'projects'
      and column_name  = 'image'
  ) then
    alter table public.projects
      add column if not exists images text[] not null default '{}';
    update public.projects
      set images = array[image]
      where image is not null and image <> '';
    alter table public.projects drop column image;
  end if;
end $$;

-- ── Admin config ──────────────────────────────────────────────
-- Stores the plain-text admin PIN. No RLS — accessed only via service-role key.
create table if not exists public.admin_config (
  id  integer primary key default 1,
  pin text not null default '1234'
);

insert into public.admin_config (id, pin)
values (1, '1234')
on conflict (id) do nothing;
