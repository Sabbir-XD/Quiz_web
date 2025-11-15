'use client';

import { usePaths } from 'src/routes/paths';

import { CONFIG_STATIC } from 'src/config-global';

export function useEndpoints() {
  const { locale } = usePaths();
  const BASE_URL = CONFIG_STATIC.serverUrl;

  return {
    banners: `${BASE_URL}/api/banners/`,
    get_quizzes: `${BASE_URL}/api/get_quiz/`,
    chat: `${BASE_URL}/${locale}/api/chat`,
    auth: {
      me: '/api/auth/users/me/',
      signIn: '/api/auth/jwt/create/',
      signUp: '/api/users/',
    },
    mail: {
      list: `${BASE_URL}/${locale}/api/mail/list`,
      details: `${BASE_URL}/${locale}/api/mail/details`,
      labels: `${BASE_URL}/${locale}/api/mail/labels`,
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
