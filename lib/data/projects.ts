import { getSupabaseClient } from '@/lib/supabase';
import type { Slide } from '@/app/components/Carousel';

// Used until Supabase is configured, and as the seed data for the `projects` table.
export const fallbackProjects: Slide[] = [
  {
    image: '/images/image-2.jpg',
    badge: '2025',
    title: 'CTO, PadiUMKM',
    description: "Leading platform strategy for Indonesia's UMKM ecosystem.",
    href: '#',
  },
  {
    image: '/images/image-3.jpg',
    badge: '2015',
    title: 'CTO, Campaign.com',
    description: 'Built and scaled digital campaign technologies across the region.',
    href: '#',
  },
  {
    image: '/images/image-4.jpg',
    badge: 'Enterprise',
    title: 'VP IT CRM, Kalbe',
    description: 'Oversaw CRM and engagement systems for a leading pharmaceutical group.',
    href: '#',
  },
];

export async function getProjects(): Promise<Slide[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackProjects;

  const { data, error } = await supabase
    .from('projects')
    .select('image_url, badge, title, description, href')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) return fallbackProjects;

  return data.map((row) => ({
    image: row.image_url,
    badge: row.badge ?? undefined,
    title: row.title,
    description: row.description ?? '',
    href: row.href ?? undefined,
  }));
}
