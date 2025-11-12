import { CONFIG_STATIC } from 'src/config-global';
import quizFrom from 'src/layouts/dashboard/quizzes/quizFrom';

// ----------------------------------------------------------------------

export const metadata = { title: `Quiz Create | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <quizFrom />;
}
