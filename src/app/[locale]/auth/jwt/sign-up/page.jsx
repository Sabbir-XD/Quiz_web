
import { CONFIG_STATIC } from 'src/config-global';

import { JwtSignUpView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG_STATIC.appName}` };

export default function Page() {
  return <JwtSignUpView />;
}
