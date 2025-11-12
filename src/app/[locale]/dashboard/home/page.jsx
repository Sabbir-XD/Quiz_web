import { CONFIG_STATIC } from 'src/config-global';
import HeroForm from 'src/layouts/dashboard/home/heroManager/heroFrom';

// ------------------------------------------------------------

export const metadata = { title: `Instruction Form | Dashboard - ${CONFIG_STATIC.appName}` };

export default function CreateHeroPage() {
  return <HeroForm />; // No editId → form will be empty for new banner
}
