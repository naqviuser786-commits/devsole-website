import { Services } from '@/components/sections/Services';
import { CostEstimator } from '@/components/sections/CostEstimator';
import { Contact } from '@/components/sections/Contact';

export function ServicesPage() {
  return (
    <div className="pt-20">
      <Services />
      <CostEstimator />
      <Contact />
    </div>
  );
}
export default ServicesPage;