'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  List,
  Menu,
  AppBar,
  Button,
  Drawer,
  Toolbar,
  ListItem,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { LanguagePopover } from 'src/layouts/components/language-popover';

import { Logo } from '../logo';
import { signOut } from '../../auth/context/jwt';
import { useAuthContext } from '../../auth/hooks';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

export default function AppNavbar({ slice }) {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const t = useTranslations('Navbar');

  // console.log('lang', slice);
  // Detect current locale from path, e.g. /en/dashboard => "en"
  const locale = pathname?.split('/')[1] || 'en';

  // Dynamic links for current locale
  const navLinks = [
    { title: t('home'), path: `/${locale}` },
    { title: t('pricing'), path: `/${locale}/pricing` },
    { title: t('terms'), path: `/${locale}/terms` },
    ...(!user ? [{ title: t('dashboard'), path: `/${locale}/dashboard` }] : []),
  ];

  // Proper active route check
  const isActive = (path) => {
    if (path === `/${locale}`) {
      // Home page active for /bn or /bn/
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    // Other pages active when path starts with the target route
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Handlers
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await signOut();
      handleMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Drawer content (mobile)
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      {/* Logo */}
      <Box sx={{ py: 2 }}>
        <Link
          href={`/${locale}`}
          style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}
        >
          <Logo disableLink />
        </Link>
      </Box>

      {/* Nav links */}
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                textAlign: 'center',
                color: isActive(item.path) ? '#00A76F' : '#111',
                backgroundColor: isActive(item.path) ? '#f0fdf7' : 'transparent',
                fontWeight: isActive(item.path) ? 600 : 400,
                '&:hover': { backgroundColor: '#f4f4f4' },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Login / Logout for mobile */}
        <ListItem disablePadding sx={{ mt: 2 }}>
          {user ? (
            <Box sx={{ width: '100%', px: 2 }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  justifyContent: 'center',
                  borderRadius: '25px',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #118D57 0%, #00A76F 100%)',
                  },
                }}
              >
                Logout
              </ListItemButton>
            </Box>
          ) : (
            <ListItemButton
              component={Link}
              href={`/${locale}/auth/jwt/sign-in`}
              sx={{
                justifyContent: 'center',
                mx: 2,
                borderRadius: '25px',
                color: '#fff',
                background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #118D57 0%, #00A76F 100%)',
                },
              }}
            >
              Login
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          backgroundColor: '#fff',
          color: '#111',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Logo disableLink />
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={Link}
                href={item.path}
                sx={{
                  mx: 1,
                  color: isActive(item.path) ? '#00A76F' : '#111',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  textTransform: 'none',
                  position: 'relative',
                  '&:hover': { color: '#00A76F' },
                  '&::after': isActive(item.path)
                    ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: '3px',
                        backgroundColor: '#00A76F',
                        borderRadius: '2px',
                      }
                    : {},
                }}
              >
                {item.title}
              </Button>
            ))}

            <Box ml={1}>
              <LocaleSwitcher />
              <LanguagePopover />
            </Box>

            {user ? (
              <>
                <IconButton onClick={handleAvatarClick} sx={{ ml: 2, p: 0 }}>
                  <Avatar
                    alt={user?.username || 'User'}
                    src={user?.photoURL || '/static/images/avatar/3.jpg'}
                    sx={{ width: 40, height: 40, border: '2px solid #00A76F' }}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                      minWidth: 180,
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      py: 1.5,
                      color: '#d32f2f',
                      fontWeight: 500,
                      '&:hover': { backgroundColor: '#ffebee' },
                    }}
                  >
                    {t('logout')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                href={`/${locale}/auth/jwt/sign-in`}
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #118D57 0%, #00A76F 100%)' },
                }}
              >
                {t('login')}
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
            {user && (
              <Avatar
                alt={user?.username || 'User'}
                src={user?.photoURL || '/static/images/avatar/3.jpg'}
                sx={{ width: 40, height: 40, border: '2px solid #00A76F', mr: 1 }}
              />
            )}
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: '#111' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
