import { CONFIG } from 'src/config-global';

import TermsContent from 'src/components/TermsContent/TermsContent';

// ----------------------------------------------------------------------
export const metadata = { title: `Terms & Conditions - ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default async function TermsPage() {
  // (Optional) You could fetch data here from an API if needed.
  // const res = await fetch("https://api.example.com/terms", { cache: 'no-store' });
  // const data = await res.json();

  return <TermsContent />;
}
