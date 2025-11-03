'use client';

import { usePaths } from './routes/paths';
import { CONFIG_STATIC } from './config-global';

export function useConfig() {
  const paths = usePaths();

  return {
    ...CONFIG_STATIC,
    auth: {
      method: 'jwt',
      skip: false,
      redirectPath: paths.dashboard.root,
    },
  };
}
