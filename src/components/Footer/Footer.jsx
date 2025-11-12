'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Grid, Link, Button, Divider, Container, Typography, IconButton } from '@mui/material';

import { Logo } from '../logo';

export default function Footer() {
  const t = useTranslations('Footer');

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', color: '#1877F2' },
    { icon: <XIcon />, url: 'https://twitter.com', color: '#000000' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', color: '#E4405F' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', color: '#0A66C2' },
  ];

  const quickLinks = t.raw('sections.quick');
  const quizCategories = t.raw('sections.categories');
  const supportLinks = t.raw('sections.support');

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #002F34 0%, #003D2F 100%)',
        color: 'white',
        pt: 8,
        pb: 3,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 3 }}>
                <Logo />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, lineHeight: 1.6 }}
                >
                  {t('aboutText')}
                </Typography>
              </Box>

              {/* Contact Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2">{t('contactEmail')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2">{t('contactPhone')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2">{t('contactAddress')}</Typography>
                </Box>
              </Box>

              {/* Social Links */}
              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontSize: '1rem' }}>
                {t('followUs')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((item, i) => (
                  <m.div key={i} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <IconButton
                      component={Link}
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: item.color,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${item.color}40`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </m.div>
                ))}
              </Box>
            </m.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
              {t('quickLinks')}
            </Typography>
            {quickLinks.map((label, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 2, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#22C55E' } }}
              >
                {label}
              </Typography>
            ))}
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
              {t('categories')}
            </Typography>
            {quizCategories.map((label, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 2, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#3B82F6' } }}
              >
                {label}
              </Typography>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
              {t('newsletter')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
              {t('newsletterDesc')}
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`🎉${  t('subscribe')  } successful!`);
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: '#22C55E',
                    color: 'white',
                    px: 3,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    minWidth: '120px',
                    '&:hover': { backgroundColor: '#16A34A' },
                  }}
                >
                  {t('subscribe')}
                </Button>
              </Box>
            </form>

            {/* Support Links */}
            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {supportLinks.map((label, i) => (
                <Typography
                  key={i}
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    '&:hover': { color: '#22C55E' },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} QuizMaster. {t('rights')} <br />
          {t('madeWith')}
        </Box>
      </Container>
    </Box>
  );
}
