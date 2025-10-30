// import { NextIntlClientProvider, hasLocale } from 'next-intl';
// import { getRequestConfig, setRequestLocale } from 'next-intl/server';
// import { notFound } from 'next/navigation';
// import { routing } from '../../i18n/routing';
// import RootGlobalLayout from '../layout';
// import { Box } from '@mui/material';

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function RootLayout({ children, params }) {
  // const { locale } = params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  // setRequestLocale(locale)

  // const { messages } = await getRequestConfig(async ({ requestLocale }) => {
  //   const requested = await requestLocale;
  //   const selectedLocale = hasLocale(routing.locales, requested)
  //     ? requested
  //     : routing.defaultLocale;

  //   return {
  //     locale: selectedLocale,
  //     messages: (await import(`/messages/${selectedLocale}.json`)).default
  //   };
  // })({ requestLocale: locale });

  return children;

  // return (
  //   <RootGlobalLayout>
  //     <NextIntlClientProvider locale={locale} >
  //       {children}
  //     </NextIntlClientProvider>
  //   </RootGlobalLayout>
  // );
}

