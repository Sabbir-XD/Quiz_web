
import { CONFIG_STATIC } from 'src/config-global';

import AllQuizQuestions from 'src/components/QuizPage/AllQuizQuestions';

// ----------------------------------------------------------------------

export const metadata = { title: `ALL-Quiz-qus - ${CONFIG_STATIC.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <AllQuizQuestions />;
}
