import { CONFIG_STATIC } from 'src/config-global';
import HeroList from 'src/layouts/dashboard/home/heroManager/HeroList';

// ----------------------------------------------------------------------

export const metadata = { title: `Hero page | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <HeroList />;
}
