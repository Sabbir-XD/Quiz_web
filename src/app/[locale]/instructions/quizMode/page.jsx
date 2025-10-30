import { CONFIG } from 'src/config-global';

import QuizModeSelection from 'src/components/Instruction/QuizModeSelection';

// ----------------------------------------------------------------------

export const metadata = { title: `Quiz-Mode - ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <QuizModeSelection />;
}
