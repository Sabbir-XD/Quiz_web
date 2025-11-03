
import { CONFIG_STATIC } from 'src/config-global';

import { JwtSignInView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <JwtSignInView />;
}
