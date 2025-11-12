'use client';

import { useParams } from 'next/navigation';

import HeroForm from 'src/layouts/dashboard/home/heroManager/heroFrom';

export default function EditHeroPage() {
  const params = useParams();
    const editId = params.id;
    
    // console.log(editId);

  return <HeroForm editId={editId} />; // Pass editId → form will fetch & prefill data
}
