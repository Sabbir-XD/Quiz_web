
import { CONFIG_STATIC } from 'src/config-global';

import { BlankView } from 'src/sections/blank - Copy/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {

  return <BlankView title="Home" />;
}
