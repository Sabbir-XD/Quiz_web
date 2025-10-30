'use client';

import React from 'react';
import { m } from 'framer-motion';

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
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', color: '#1877F2' },
    { icon: <XIcon />, url: 'https://twitter.com', color: '#000000' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', color: '#E4405F' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', color: '#0A66C2' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Quizzes', href: '/quizzes' },
    { label: 'BCS Preparation', href: '/bcs' },
    { label: 'IELTS Practice', href: '/ielts' },
    { label: 'Job Tests', href: '/jobs' },
  ];

  const quizCategories = [
    { label: 'Programming', href: '/programming' },
    { label: 'Mathematics', href: '/math' },
    { label: 'Science', href: '/science' },
    { label: 'English Grammar', href: '/english' },
    { label: 'Current Affairs', href: '/current-affairs' },
  ];

  const supportLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ];

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
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 3 }}>
                <Logo />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, lineHeight: 1.6 }}
                >
                  Master your skills with our interactive quiz platform. Practice, learn, and excel
                  in your career with thousands of curated questions.
                </Typography>
              </Box>

              {/* Contact Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    support@quizmaster.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    +880 1234-567890
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#22C55E', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Dhaka, Bangladesh
                  </Typography>
                </Box>
              </Box>

              {/* Social Links */}
              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontSize: '1rem' }}>
                  Follow Us
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
              </Box>
            </m.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
                Quick Links
              </Typography>
              {quickLinks.map((link, i) => (
                <m.div
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Typography
                    variant="body2"
                    component={Link}
                    href={link.href}
                    color="inherit"
                    underline="none"
                    sx={{
                      display: 'block',
                      mb: 2,
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: '#22C55E',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Typography>
                </m.div>
              ))}
            </m.div>
          </Grid>

          {/* Quiz Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
                Categories
              </Typography>
              {quizCategories.map((link, i) => (
                <m.div
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Typography
                    variant="body2"
                    component={Link}
                    href={link.href}
                    color="inherit"
                    underline="none"
                    sx={{
                      display: 'block',
                      mb: 2,
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: '#3B82F6',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Typography>
                </m.div>
              ))}
            </m.div>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontSize: '1.1rem' }}>
                Get Quiz Updates
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Subscribe to receive new quiz notifications and learning tips.
              </Typography>

              <m.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('🎉 Thank you for subscribing! You will receive quiz updates.');
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
                  <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                        '&:hover': {
                          backgroundColor: '#16A34A',
                          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Subscribe
                    </Button>
                  </m.div>
                </Box>
              </m.form>

              {/* Support Links */}
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {supportLinks.map((link, i) => (
                  <m.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Typography
                      variant="caption"
                      component={Link}
                      href={link.href}
                      color="inherit"
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.6)',
                        '&:hover': {
                          color: '#22C55E',
                        },
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {link.label}
                    </Typography>
                  </m.div>
                ))}
              </Box>
            </m.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Copyright */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}
            >
              © {new Date().getFullYear()} QuizMaster. All rights reserved.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}
            >
              Made with ❤️ for Bangladeshi Learners
            </Typography>
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}
