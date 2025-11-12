import { CONFIG_STATIC } from 'src/config-global';

import { BlankView } from 'src/sections/blank - Copy/view';

import quizFrom from 'src/layouts/dashboard/quizzes/quizFrom';

// ----------------------------------------------------------------------

export const metadata = { title: `Quiz List | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <quizFrom />;
}
