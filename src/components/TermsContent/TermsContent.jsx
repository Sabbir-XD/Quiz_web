'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Icon } from '@iconify/react';

import GavelIcon from '@mui/icons-material/Gavel';
import ShieldIcon from '@mui/icons-material/Shield';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Box,
  Chip,
  Grid,
  Paper,
  Button,
  Divider,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

export default function TermsContent() {
  const [expanded, setExpanded] = useState('section1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const accordionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const sections = [
    {
      id: 'section1',
      icon: 'mdi:account-check',
      title: 'Acceptance of Terms',
      color: '#6366F1',
      content: `By accessing and using QuizMaster...`,
    },
    {
      id: 'section2',
      icon: 'mdi:account-lock',
      title: 'User Accounts',
      color: '#10B981',
      content: `You are responsible for maintaining...`,
    },
    {
      id: 'section3',
      icon: 'mdi:currency-bdt',
      title: 'Payment Terms',
      color: '#F59E0B',
      content: `All payments are processed securely...`,
    },
    {
      id: 'section4',
      icon: 'mdi:content-copy',
      title: 'Intellectual Property',
      color: '#EF4444',
      content: `All content on this Platform...`,
    },
    {
      id: 'section5',
      icon: 'mdi:shield-account',
      title: 'Privacy Policy',
      color: '#8B5CF6',
      content: `Your privacy is important to us...`,
    },
    {
      id: 'section6',
      icon: 'mdi:close-circle',
      title: 'Termination',
      color: '#06B6D4',
      content: `We reserve the right to terminate...`,
    },
    {
      id: 'section7',
      icon: 'mdi:scale-balance',
      title: 'Limitation of Liability',
      color: '#84CC16',
      content: `QuizMaster shall not be liable...`,
    },
    {
      id: 'section8',
      icon: 'mdi:gavel',
      title: 'Governing Law',
      color: '#F97316',
      content: `These Terms shall be governed...`,
    },
  ];

  const features = [
    {
      icon: <ShieldIcon />,
      title: 'Secure',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: <GavelIcon />,
      title: 'Legal',
      description: 'Compliant with international privacy standards',
    },
    {
      icon: <PrivacyTipIcon />,
      title: 'Transparent',
      description: 'Clear and understandable terms for everyone',
    },
    {
      icon: <DescriptionIcon />,
      title: 'Comprehensive',
      description: 'Covering all aspects of platform usage',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 3, color: 'primary.main' }}
              onClick={() => window.history.back()}
            >
              Back
            </Button>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Chip
                label="Last Updated: September 2025"
                color="primary"
                sx={{ mb: 2, fontWeight: 'bold' }}
              />
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
              >
                Please read these terms and conditions carefully before using QuizMaster.
              </Typography>
            </Box>

            {/* Features */}
            <m.div variants={containerVariants} initial="hidden" animate="visible">
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {features.map((feature, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <m.div variants={itemVariants}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          borderRadius: 3,
                          background: 'rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(10px)',
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #22C55E, #00A76F)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: 'white',
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Paper>
                    </m.div>
                  </Grid>
                ))}
              </Grid>
            </m.div>
          </Box>
        </m.div>

        {/* Terms Sections */}
        <m.div variants={containerVariants} initial="hidden" animate="visible">
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <m.div variants={itemVariants}>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                Introduction
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                Welcome to QuizMaster. These Terms and Conditions govern your use of our website.
              </Typography>
              <Divider sx={{ my: 4 }} />
            </m.div>

            <Box sx={{ mb: 4 }}>
              {sections.map((s) => (
                <m.div key={s.id} variants={accordionVariants}>
                  <Accordion
                    expanded={expanded === s.id}
                    onChange={handleChange(s.id)}
                    sx={{
                      mb: 2,
                      borderRadius: '12px !important',
                      border: `2px solid ${expanded === s.id ? s.color : 'transparent'}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      '&:before': { display: 'none' },
                      '&:hover': {
                        border: `2px solid ${s.color}40`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '10px',
                            background: `linear-gradient(135deg, ${s.color}20, ${s.color}40)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon icon={s.icon} width="20" height="20" color={s.color} />
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          {s.title}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                      <Typography variant="body1" color="text.secondary">
                        {s.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </m.div>
              ))}
            </Box>

            <m.div variants={itemVariants}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #22C55E, #00A76F)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Questions About Our Terms?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  If you have any questions, please contact our legal team.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: 'common.black',
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: '25px',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Contact Legal Team
                </Button>
              </Paper>
            </m.div>

            <m.div variants={itemVariants}>
              <Box
                sx={{
                  textAlign: 'center',
                  mt: 6,
                  p: 4,
                  backgroundColor: '#f8fafc',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Download Terms & Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Save a copy of our terms for your records
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ borderRadius: '25px', px: 4, py: 1.5, fontWeight: 'bold' }}
                >
                  Download PDF
                </Button>
              </Box>
            </m.div>
          </Paper>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} QuizMaster. All rights reserved. | Version 2.1 |
              Effective Date: December 1, 2024
            </Typography>
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}
