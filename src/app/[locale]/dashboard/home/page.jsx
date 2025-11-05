'use client';

import { useSearchParams } from 'next/navigation';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import HeroManagement from 'src/layouts/dashboard/home/heroManager/heroManager';

export default function Page() {
  const { banners: bannerUrl } = useEndpoints();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  // Get all banners
  const { data: allBanners, isLoading } = useApi(bannerUrl, { fetch: true });

  // If we're in edit mode, find the specific banner
  const selectedBanner =
    editId && allBanners ? allBanners.find((banner) => String(banner.id) === String(editId)) : null;

  // Show loading state while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If we're trying to edit a banner that doesn't exist
  if (editId && !selectedBanner && !isLoading) {
    return <div>Banner not found</div>;
  }

  // For editing: pass the selected banner
  // For creating: pass null
  return <HeroManagement Banners={editId ? selectedBanner : null} />;
}
