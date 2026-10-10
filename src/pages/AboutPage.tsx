import { About } from '@/components/sections/About';
import { Team } from '@/components/sections/Team';
import { WhyDevsole } from '@/components/sections/WhyDevsole';

export function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <WhyDevsole />
      <Team />
    </div>
  );
}
export default AboutPage;