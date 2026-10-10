import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}
export default ProjectsPage;