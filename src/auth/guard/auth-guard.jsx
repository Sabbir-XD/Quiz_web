'use client';

import { useState, useEffect, useCallback } from 'react';

import { usePaths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG_STATIC } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export function AuthGuard({ children }) {
  const paths = usePaths();
  const router = useRouter();

  const searchParams = useSearchParams();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const pathname = usePathname();
  const slice = pathname.split('/').slice(0, 2).join('');
  console.log(slice);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      const { method } = CONFIG_STATIC.auth;

      const signInPath = {
        jwt: paths.auth.jwt.signIn,
        auth0: paths.auth.auth0.signIn,
        amplify: paths.auth.amplify.signIn,
        firebase: paths.auth.firebase.signIn,
        supabase: paths.auth.supabase.signIn,
      }[method];
     
      

      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

      router.replace(href);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
