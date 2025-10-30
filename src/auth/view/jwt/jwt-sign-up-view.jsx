'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../../context/jwt';
import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';

// ----------------------------------------------------------------------
export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  username: zod.string().min(1, { message: 'Username is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' }),
});

// ----------------------------------------------------------------------
export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();
  const router = useRouter();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');

  /* const defaultValues = {
    firstName: 'Hello',
    lastName: 'Friend',
    email: 'hello@gmail.com',
    password: '@demo1',
  }; */

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        username: data.username,
        // firstName: data.firstName,
        // lastName: data.lastName,
      });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // =======================
  // Form UI (Design Updated)
  // =======================
  return (
    <>
      <FormHead
        title="Create your account"
        description={
          <>
            Already have an account?{' '}
            <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
              Sign in
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <Paper
        sx={{
          width: '100%',
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <Form methods={methods} onSubmit={onSubmit}>
          <Box gap={3} display="flex" flexDirection="column">
            <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Field.Text
                name="firstName"
                label="First name"
                InputLabelProps={{ shrink: true }}
                sx={{ '& fieldset': { borderRadius: '12px' } }}
              />
              <Field.Text
                name="lastName"
                label="Last name"
                InputLabelProps={{ shrink: true }}
                sx={{ '& fieldset': { borderRadius: '12px' } }}
              />
            </Box>

            <Field.Text
              name="username"
              label="Username"
              InputLabelProps={{ shrink: true }}
              sx={{ '& fieldset': { borderRadius: '12px' } }}
            />

            <Field.Text
              name="email"
              label="Email address"
              InputLabelProps={{ shrink: true }}
              sx={{ '& fieldset': { borderRadius: '12px' } }}
            />

            <Field.Text
              name="password"
              label="Password"
              placeholder="8+ characters"
              type={password.value ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& fieldset': { borderRadius: '12px' } }}
            />

            <LoadingButton
              fullWidth
              color="success"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingIndicator="Creating..."
              sx={{
                py: 1.4,
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '50px',
                boxShadow: '0px 3px 10px rgba(0,200,83,0.25)',
              }}
            >
              Create Account
            </LoadingButton>
          </Box>
        </Form>
      </Paper>

      <SignUpTerms />
    </>
  );
}
