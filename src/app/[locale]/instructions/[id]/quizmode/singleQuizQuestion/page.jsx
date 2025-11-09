import { CONFIG_STATIC } from 'src/config-global';

import SingleQuizQuestion from 'src/components/QuizPage/SingleQuizQuestion';

// ----------------------------------------------------------------------

export const metadata = { title: `Single-Quiz-qus - ${CONFIG_STATIC.appName}` };

// ----------------------------------------------------------------------

export default function page() {
  return <SingleQuizQuestion />;
}
