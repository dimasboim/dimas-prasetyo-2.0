import { getSupabaseClient } from '@/lib/supabase';

export type SkillGroup = {
  title: string;
  items: string[];
};

// Used until Supabase is configured, and as the seed data for the `skill_groups` / `skills` tables.
export const fallbackSkillGroups: SkillGroup[] = [
  {
    title: 'Technology',
    items: [
      'Technical Strategy & Architecture',
      'Platform Engineering',
      'Cloud (AWS / GCP / Azure)',
      'DevOps, SRE & CI/CD',
      'Security, Compliance & Risk',
      'Data Engineering & Analytics',
      'AI/ML Strategy',
      'Microservices & Distributed Systems',
      'APIs & Enterprise Integration',
      'Observability & Performance',
      'Quality Engineering & Testing',
    ],
  },
  {
    title: 'Delivery',
    items: [
      'Product Strategy & Roadmaps',
      'Agile / Lean Delivery',
      'Governance & Portfolio Management',
      'Vendor & Partner Management',
      'Budgeting, FinOps & Cost Optimization',
    ],
  },
  {
    title: 'Leadership',
    items: [
      'Org Design & Operating Models',
      'Engineering Management',
      'Hiring, Coaching & Mentoring',
      'Stakeholder Management',
    ],
  },
];

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackSkillGroups;

  const { data: groups, error: groupsError } = await supabase
    .from('skill_groups')
    .select('id, title, display_order')
    .order('display_order', { ascending: true });

  if (groupsError || !groups || groups.length === 0) return fallbackSkillGroups;

  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('group_id, name, display_order')
    .order('display_order', { ascending: true });

  if (skillsError) return fallbackSkillGroups;

  return groups.map((group) => ({
    title: group.title,
    items: (skills ?? []).filter((skill) => skill.group_id === group.id).map((skill) => skill.name),
  }));
}
