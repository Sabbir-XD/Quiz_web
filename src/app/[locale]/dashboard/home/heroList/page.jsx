'use client';

import { useRouter } from 'next/navigation';

import HeroList from 'src/layouts/dashboard/home/heroManager/HeroList';

// ------------------------------------------------------------
export default function Page() {
  const router = useRouter();

  return (
    <HeroList
      onCreate={() => router.push('/en/dashboard/home')}
      onEdit={(item) => router.push(`/en/dashboard/home?edit=${item.id}`)}
    />
  );
}
