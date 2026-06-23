# dimas-prasetyo

Next.js personal site for `dimasboim/dimas-prasetyo-2.0`, built for deployment on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Supabase setup

Testimonials, selected-work projects, skills, and the footer view counter are
backed by Supabase, with static fallbacks so the site still renders if it
isn't configured yet.

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) to create the tables, RLS policies, and the view-counter function.
3. Run [`supabase/seed.sql`](supabase/seed.sql) to seed the tables with the content currently on the live site. Edit rows afterwards from the Supabase table editor — no redeploy needed.
4. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Project Settings > API.
5. Add the same two env vars to the Vercel project (Settings > Environment Variables) before deploying.

## Deploy to Vercel

This repository is ready for Vercel deployment. Connect the GitHub repository to Vercel, set the Supabase env vars above, and deploy the `main` branch.

Vercel will automatically detect the Next.js project.
