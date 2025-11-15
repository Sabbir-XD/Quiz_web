import { Box } from '@mui/material';

import { CONFIG_STATIC } from 'src/config-global';
import QuizFrom from 'src/layouts/dashboard/home/quizzes/quizFrom';
// ----------------------------------------------------------------------

export const metadata = { title: `Quiz Create | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return (
   <Box>
     <QuizFrom />
   </Box>
  );
}
