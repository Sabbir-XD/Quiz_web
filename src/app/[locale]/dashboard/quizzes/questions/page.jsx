import { CONFIG_STATIC } from 'src/config-global';
import QuestionForm from 'src/layouts/dashboard/home/quizzes/questionForm';



// ----------------------------------------------------------------------

export const metadata = { title: `Quiz Qus | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <QuestionForm />;
}