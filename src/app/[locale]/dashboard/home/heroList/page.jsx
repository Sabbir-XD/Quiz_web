// 'use client';

import HeroList from 'src/layouts/dashboard/home/heroManager/Herolist';

// import { useRouter } from 'next/navigation';

// ------------------------------------------------------------
export default function Page() {
  // const router = useRouter();

  return (
    <HeroList
    // onCreate={() => router.push(`/en/dashboard/home`)}
    // onEdit={(id) => router.push(`/en/dashboard/home/edit/${id}`)}
    />
  );
}
