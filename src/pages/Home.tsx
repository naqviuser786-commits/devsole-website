import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { TechMarquee } from '@/components/ui/TechMarquee';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { WhyDevsole } from '@/components/sections/WhyDevsole';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Technologies } from '@/components/sections/Technologies';
import { Process } from '@/components/sections/Process';
import { Team } from '@/components/sections/Team';
import { CostEstimator } from '@/components/sections/CostEstimator';
import { Blog } from '@/components/sections/Blog';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TechMarquee />
      <About />
      <Services />
      <WhyDevsole />
      <Projects />

      {/* ⭐ Real Client Testimonials & 5-Star Social Proof */}
      <Testimonials />

      <Technologies />
      <Process />
      <Team />
      <CostEstimator />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}