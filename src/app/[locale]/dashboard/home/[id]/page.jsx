import { CONFIG_STATIC } from 'src/config-global';
import HeroForm from 'src/layouts/dashboard/home/heroManager/heroFrom';

// ------------------------------------------------------------

export const metadata = {
  title: `Edit Hero Banner | Dashboard - ${CONFIG_STATIC.appName}`,
};

export default function Page({ params }) {
  const { id } = params; // get ID from URL

  return <HeroForm editId={id} />;
}
