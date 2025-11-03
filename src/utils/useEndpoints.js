'use client';

import { usePaths } from "src/routes/paths";

export function useEndpoints() {
  const { locale } = usePaths(); 

  return {
    chat: `/${locale}/api/chat`,
    auth: {
      me: `/${locale}/auth/users/me/`,
      signIn: `/${locale}/auth/jwt/create/`,
      signUp: `/${locale}/auth/users/`,
    },
    mail: {
      list: `/${locale}/api/mail/list`,
      details: `/${locale}/api/mail/details`,
      labels: `/${locale}/api/mail/labels`,
    },
  };
}
