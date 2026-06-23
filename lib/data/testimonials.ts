import { getSupabaseClient } from '@/lib/supabase';
import type { Slide } from '@/app/components/Carousel';

// Used until Supabase is configured, and as the seed data for the `testimonials` table.
export const fallbackTestimonials: Slide[] = [
  {
    image: '/images/images-5.png',
    badge: 'Campaign.com CEO',
    title: '"Dimas helped us ship faster without sacrificing quality."',
    description: 'Campaign — delivery excellence and platform foundations.',
  },
  {
    image: '/images/image-6.jpg',
    badge: 'CRM Account Manager',
    title: '"He brings clarity to messy transformations."',
    description: 'Enterprise digital modernization — operating model redesign.',
  },
  {
    image: '/images/images-7.png',
    badge: 'Developer PadiUMKM',
    title: '"Pragmatic and people-first leadership."',
    description: 'Scaling engineering organization — hiring and rituals.',
  },
];

export async function getTestimonials(): Promise<Slide[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackTestimonials;

  const { data, error } = await supabase
    .from('testimonials')
    .select('image_url, author_role, quote, author_name')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) return fallbackTestimonials;

  return data.map((row) => ({
    image: row.image_url,
    badge: row.author_role ?? undefined,
    title: row.quote,
    description: row.author_name,
  }));
}
