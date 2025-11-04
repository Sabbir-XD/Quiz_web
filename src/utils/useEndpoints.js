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


// export const endpoints = {
//   chat: '/api/chat',
//   kanban: '/api/kanban',
//   calendar: '/api/calendar',
//   auth: {
//     me: '/auth/users/me/',
//     signIn: '/auth/jwt/create/',
//     signUp: '/auth/users/',
//   },
//   mail: {
//     list: '/api/mail/list',
//     details: '/api/mail/details',
//     labels: '/api/mail/labels',
//   },
//   post: {
//     list: '/api/post/list',
//     details: '/api/post/details',
//     latest: '/api/post/latest',
//     search: '/api/post/search',
//   },
//   product: {
//     list: '/api/product/list',
//     details: '/api/product/details',
//     search: '/api/product/search',
//   },
// };
