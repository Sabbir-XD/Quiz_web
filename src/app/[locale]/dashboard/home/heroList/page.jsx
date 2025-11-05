'use client';

import { useRouter } from 'next/navigation';

import HeroList from 'src/layouts/dashboard/home/heroManager/HeroList';

export default function Page() {
  const router = useRouter();

  const handleEdit = (banner) => {
    router.push(`/en/dashboard/home?edit=${banner.id}`);
  };

  const handleCreate = () => {
    router.push('/en/dashboard/home');
  };

  return <HeroList onCreate={handleCreate} onEdit={handleEdit} />;
}
