import 'src/global.css';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getRequestConfig, setRequestLocale } from 'next-intl/server';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

import { routing } from '../i18n/routing';
import ConditionalLayout from '../layouts/ConditionalLayout/ConditionalLayout';
// import { notFound } from 'next/navigation';


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

export default async function RootLayout({ children, params }) {
  // const locale = await params;
  const { locale } = await params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  setRequestLocale(locale)

  const { messages } = await getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const selectedLocale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    return {
      locale: selectedLocale,
      messages: (await import(`/messages/${selectedLocale}.json`)).default
    };
  })({ requestLocale: locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />
        <AuthProvider>
          <SettingsProvider settings={defaultSettings}>
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <NextIntlClientProvider locale={locale}>
                  {/* Conditional Layout applied */}
                  <ConditionalLayout>
                    {children}
                  </ConditionalLayout>
                </NextIntlClientProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
