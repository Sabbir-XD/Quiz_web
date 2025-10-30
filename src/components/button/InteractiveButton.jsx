'use client';

import { Button, CircularProgress } from '@mui/material';

export default function InteractiveButton({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
}) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
      sx={{
        borderRadius: '30px',
        px: 4,
        py: 1.2,
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      {children}
    </Button>
  );
}
