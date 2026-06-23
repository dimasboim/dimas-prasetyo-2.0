import Home from './components/Home';
import { getSkillGroups } from '@/lib/data/skills';
import { getProjects } from '@/lib/data/projects';
import { getTestimonials } from '@/lib/data/testimonials';

export const revalidate = 60;

export default async function Page() {
  const [skillGroups, projects, testimonials] = await Promise.all([
    getSkillGroups(),
    getProjects(),
    getTestimonials(),
  ]);

  return <Home skillGroups={skillGroups} projects={projects} testimonials={testimonials} />;
}
