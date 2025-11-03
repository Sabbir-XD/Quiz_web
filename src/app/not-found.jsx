import { CONFIG_STATIC } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `404 page not found! | Error - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <NotFoundView />;
}
