import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Box } from '@mui/material';

import { CONFIG } from '../../config-global';
import HeroSlider from '../../sections/landing/hero/Hero';
import QuizSection from '../../sections/landing/QuizSection/QuizSection';
import OurQuizServices from '../../sections/landing/QuizCategories/QuizCategories';
import MembershipPlans from '../../sections/landing/MembershipPlans/MembershipPlans';
import QuizConversionSection from '../../sections/landing/QuizConversionSection/QuizConversionSection';

// ----------------------------------------------------------------------

export const metadata = { title: `HOME - ${CONFIG.appName}` };

export default function Page({ params }) {
  const { locale } = params; // FIXED — no use()
  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return (
    <Box>
      {/* <Typography variant="h1">
        {t('title')}
      </Typography> */}
      <HeroSlider />
      <QuizConversionSection />
      {/* <CoursePromo /> */}
      <MembershipPlans />
      <OurQuizServices />
      <QuizSection />
    </Box>
  );
}
