import { CONFIG } from 'src/config-global';

import InstructionsPage from 'src/components/Instruction/InstructionsPage';

// ----------------------------------------------------------------------

export const metadata = { title: `Instructions - ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <InstructionsPage />;
}
