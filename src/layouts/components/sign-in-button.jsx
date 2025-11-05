import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG_STATIC } from 'src/config-global';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  return (
    <Button
      component={RouterLink}
      href={CONFIG_STATIC.auth.redirectPath}
      variant="outlined"
      sx={sx}
      {...other}
    >
      Sign in
    </Button>
  );
}
