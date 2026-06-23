import { getSupabaseClient } from '@/lib/supabase';

export async function incrementPageView(path: string): Promise<number | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc('increment_page_view', { p_path: path });
  if (error || typeof data !== 'number') return null;
  return data;
}
