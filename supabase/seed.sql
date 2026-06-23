-- Seeds the content tables with what's currently hardcoded on the live site,
-- so the site looks the same the moment Supabase is wired up. Edit rows in
-- the Supabase table editor afterwards instead of redeploying code.

insert into public.skill_groups (title, display_order) values
  ('Technology', 0),
  ('Delivery', 1),
  ('Leadership', 2);

insert into public.skills (group_id, name, display_order)
select g.id, s.name, s.ord
from public.skill_groups g
join (values
  ('Technology', 'Technical Strategy & Architecture', 0),
  ('Technology', 'Platform Engineering', 1),
  ('Technology', 'Cloud (AWS / GCP / Azure)', 2),
  ('Technology', 'DevOps, SRE & CI/CD', 3),
  ('Technology', 'Security, Compliance & Risk', 4),
  ('Technology', 'Data Engineering & Analytics', 5),
  ('Technology', 'AI/ML Strategy', 6),
  ('Technology', 'Microservices & Distributed Systems', 7),
  ('Technology', 'APIs & Enterprise Integration', 8),
  ('Technology', 'Observability & Performance', 9),
  ('Technology', 'Quality Engineering & Testing', 10),
  ('Delivery', 'Product Strategy & Roadmaps', 0),
  ('Delivery', 'Agile / Lean Delivery', 1),
  ('Delivery', 'Governance & Portfolio Management', 2),
  ('Delivery', 'Vendor & Partner Management', 3),
  ('Delivery', 'Budgeting, FinOps & Cost Optimization', 4),
  ('Leadership', 'Org Design & Operating Models', 0),
  ('Leadership', 'Engineering Management', 1),
  ('Leadership', 'Hiring, Coaching & Mentoring', 2),
  ('Leadership', 'Stakeholder Management', 3)
) as s (group_title, name, ord) on s.group_title = g.title;

insert into public.projects (badge, title, description, image_url, href, display_order) values
  ('2025', 'CTO, PadiUMKM', 'Leading platform strategy for Indonesia''s UMKM ecosystem.', '/images/image-2.jpg', '#', 0),
  ('2015', 'CTO, Campaign.com', 'Built and scaled digital campaign technologies across the region.', '/images/image-3.jpg', '#', 1),
  ('Enterprise', 'VP IT CRM, Kalbe', 'Oversaw CRM and engagement systems for a leading pharmaceutical group.', '/images/image-4.jpg', '#', 2);

insert into public.testimonials (author_name, author_role, quote, image_url, display_order) values
  ('Campaign — delivery excellence and platform foundations.', 'Campaign.com CEO', '"Dimas helped us ship faster without sacrificing quality."', '/images/images-5.png', 0),
  ('Enterprise digital modernization — operating model redesign.', 'CRM Account Manager', '"He brings clarity to messy transformations."', '/images/image-6.jpg', 1),
  ('Scaling engineering organization — hiring and rituals.', 'Developer PadiUMKM', '"Pragmatic and people-first leadership."', '/images/images-7.png', 2);
