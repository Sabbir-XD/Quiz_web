'use client';

import { usePathname } from 'next/navigation';

import Footer from '../../components/Footer/Footer';
import AppNavbar from '../../components/navbar/Navbar';

// import { useState } from 'react';


export default function ConditionalLayout({ children }) {
  // const [languages, setLanguages] = useState();
  const pathname = usePathname();
  const slice = pathname.split('/').slice(0, 2).join('/');
  // setLanguages(slice);
  // console.log(slice);


  // const shouldHideLayout =
  //   pathname.startsWith('/auth') || pathname === '/sign-in' || pathname === '/sign-up';

  const signIn = `${slice}/auth/jwt/sign-in/`;
  const signUp = `${slice}/auth/jwt/sign-up/`;
  const dashboard = `${slice}/dashboard/`;
  const shouldHideLayout = pathname === signIn || pathname === signUp || pathname === dashboard;
  // console.log(signIn);

  return (
    <>
      {!shouldHideLayout && <AppNavbar  slice={slice} />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
