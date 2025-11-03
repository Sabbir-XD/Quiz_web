
import { CONFIG_STATIC } from 'src/config-global';

import QuizModeSelection from 'src/components/Instruction/QuizModeSelection';

// ----------------------------------------------------------------------

export const metadata = { title: `Quiz-Mode - ${CONFIG_STATIC.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <QuizModeSelection />;
}
