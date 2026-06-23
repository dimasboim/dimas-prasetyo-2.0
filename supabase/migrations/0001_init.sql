-- Schema for dimas-prasetyo.com: testimonials, selected-work projects,
-- skills CMS, and a page-view counter.
-- Run this in the Supabase SQL editor (or `supabase db push`) on a fresh project.

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  author_name text not null,
  author_role text,
  quote text not null,
  image_url text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  badge text,
  title text not null,
  description text,
  image_url text not null,
  href text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.skill_groups (
  id bigint generated always as identity primary key,
  title text not null,
  display_order integer not null default 0
);

create table if not exists public.skills (
  id bigint generated always as identity primary key,
  group_id bigint not null references public.skill_groups (id) on delete cascade,
  name text not null,
  display_order integer not null default 0
);

create table if not exists public.page_views (
  path text primary key,
  views bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- Row Level Security: content tables are public-read-only; writes happen via
-- the Supabase dashboard/service role, never from the browser.
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;
alter table public.skill_groups enable row level security;
alter table public.skills enable row level security;
alter table public.page_views enable row level security;

create policy "Public read published testimonials" on public.testimonials
  for select using (is_published = true);

create policy "Public read published projects" on public.projects
  for select using (is_published = true);

create policy "Public read skill groups" on public.skill_groups
  for select using (true);

create policy "Public read skills" on public.skills
  for select using (true);

-- No policies on page_views: it's only ever touched through the
-- security-definer function below, never via direct table access.

create or replace function public.increment_page_view(p_path text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_views bigint;
begin
  insert into public.page_views (path, views, updated_at)
  values (p_path, 1, now())
  on conflict (path) do update
    set views = public.page_views.views + 1,
        updated_at = now()
  returning views into v_views;

  return v_views;
end;
$$;

grant execute on function public.increment_page_view(text) to anon, authenticated;
