'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Link, Alert, IconButton, Typography, InputAdornment } from '@mui/material';

import { RouterLink } from 'src/routes/components';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
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

export function JwtSignInView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();
  const pathname = usePathname();
  const slice = pathname.split('/').slice(0, 2).join('/');
  console.log(slice);

  const defaultValues = {
    email: 'dev.sabbir@gmail.com',
    password: 'Sabbir@12',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },


  } = methods;

  console.log()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // ----------------------------------------------------------------------

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link
              component={RouterLink}
              href={`${slice}/auth/jwt/sign-up/`}
              variant="subtitle2"
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 3 }}
      />

      {/* --- Green info alert --- */}
      <Alert
        icon={false}
        sx={{
          mb: 3,
          bgcolor: '#E8F5E9', // light green
          color: '#1B5E20', // dark green text
          borderRadius: 2,
          border: '1px solid #A5D6A7',
          fontSize: '0.9rem',
          py: 1.2,
        }}
      >
        Use <strong>{defaultValues.email}</strong>
        {' with password '}
        <strong>{defaultValues.password}</strong>
      </Alert>

      {!!errorMsg && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            py: 1.2,
          }}
        >
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Email */}
          <Field.Text
            name="email"
            label="Email address"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& fieldset': {
                borderRadius: '50px',
              },
            }}
          />

          {/* Password */}
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
            sx={{
              '& fieldset': {
                borderRadius: '50px',
              },
            }}
          />

          {/* Forgot password link */}
          <Box display="flex" justifyContent="flex-end">
            <Link
              component={RouterLink}
              href="#"
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Submit button */}
          <LoadingButton
            fullWidth
            color="success"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Signing in..."
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Sign in
          </LoadingButton>
        </Box>
      </Form>

      {/* Footer small text */}
      <Typography
        variant="caption"
        sx={{
          mt: 3,
          textAlign: { xs: 'center', md: 'left' },
          color: 'text.secondary',
        }}
      >
        By signing in, you agree to our{' '}
        <Link href="#" color="primary.main" fontWeight={600}>
          Terms
        </Link>{' '}
        and{' '}
        <Link href="#" color="primary.main" fontWeight={600}>
          Privacy Policy
        </Link>
        .
      </Typography>
    </>
  );
}
