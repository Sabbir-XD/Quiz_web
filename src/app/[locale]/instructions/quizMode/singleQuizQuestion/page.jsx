import { CONFIG } from 'src/config-global';

import SingleQuizQuestion from 'src/components/QuizPage/SingleQuizQuestion';

// ----------------------------------------------------------------------

export const metadata = { title: `Single-Quiz-qus - ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <SingleQuizQuestion />;
}
