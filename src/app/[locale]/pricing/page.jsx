import { CONFIG } from 'src/config-global';

import PricingSection from 'src/components/PricingSection/PricingSection';
// ----------------------------------------------------------------------

export const metadata = { title: `Pricing - ${CONFIG.appName}` };

// ----------------------------------------------------------------------
export default async function PricingPage() {
  return (
    <PricingSection
      title="Choose Your Plan"
      subtitle="Start learning today with our flexible pricing plans."
    />
  );
}
