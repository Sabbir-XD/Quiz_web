
import { CONFIG_STATIC } from 'src/config-global';

import InstructionsPage from 'src/components/Instruction/InstructionsPage';

// ----------------------------------------------------------------------

export const metadata = { title: `Instructions - ${CONFIG_STATIC.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <InstructionsPage />;
}
