'use client';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import HeroManagement from 'src/layouts/dashboard/home/heroManager/heroManager';

// We need to move metadata to a separate layout file since it can't be in a client component
// Create a new file named layout.jsx in the same directory with this content:
// export const metadata = { title: `Hero page | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  const { banners: bannerUrl } = useEndpoints();

  const { data: Banners } = useApi(bannerUrl, { fetch: true });

  return <HeroManagement banner={Banners} />;
}
