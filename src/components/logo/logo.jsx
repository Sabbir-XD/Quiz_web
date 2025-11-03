'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { CONFIG_STATIC } from 'src/config-global';

import { logoClasses } from './classes';
import { RouterLink } from '../../routes/components';



// ----------------------------------------------------------------------

export const Logo = forwardRef(
  ({ width, href = '/', height, disableLink = false, className, sx, ...other }, ref) => {
    const logoSrc = `${CONFIG_STATIC.assetsDir}/logo/logo-full.png`;
    const logo02 = `${CONFIG_STATIC.assetsDir}/logo/hello-logo.svg`;

    return (
      <Box
        ref={ref}
        component={disableLink ? 'div' : RouterLink}
        href={disableLink ? undefined : href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {/* Left: Logo */}
        <Image
          alt="Logo"
          src={logoSrc}
          width={70}
          height={70}
          style={{
            objectFit: 'contain',
          }}
        />

        {/* Right: Text part */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          {/* <Typography
            sx={{
              fontWeight: 700,
              fontSize: '15px',
              color: '#00A76F',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Hello
          </Typography>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '10px',
              color: '#22C55E',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            English
          </Typography> */}

          <Image
            alt="Logo"
            src={logo02}
            width={70}
            height={70}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
    );
  }
);
