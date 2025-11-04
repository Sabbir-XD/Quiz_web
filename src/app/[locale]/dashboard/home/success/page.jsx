
import { CONFIG_STATIC } from 'src/config-global';

import { BlankView } from 'src/sections/blank - Copy/view';


// ----------------------------------------------------------------------

export const metadata = { title: `Success | Dashboard - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <BlankView title="Success Page" />;
}
