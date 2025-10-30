'use client';

import React from 'react';
import { m } from 'framer-motion';

import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Box,
  Card,
  Grid,
  List,
  Button,
  ListItem,
  useTheme,
  Typography,
  CardContent,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export default function MembershipPlans() {
  const theme = useTheme();

  const plans = [
    {
      title: 'Silver',
      icon: <StarIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      price: '৳499 / month',
      color: '#118D57',
      features: ['Access to basic online courses', 'Community forum support', 'Monthly newsletter'],
    },
    {
      title: 'Gold',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#fbc02d' }} />,
      price: '৳999 / month',
      color: '#fbc02d',
      features: [
        'Access to all online & offline courses',
        'Priority email support',
        'Exclusive webinars & live Q&A',
        'Certificate of completion',
      ],
    },
    {
      title: 'Premium',
      icon: <DiamondIcon sx={{ fontSize: 40, color: '#29b6f6' }} />,
      price: '৳1999 / month',
      color: '#29b6f6',
      features: [
        'Unlimited access to all materials',
        '1-on-1 mentorship session monthly',
        'Premium project review & feedback',
        'Career guidance & placement support',
      ],
    },
  ];

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(120deg, ${theme.palette.background.default}, ${theme.palette.grey[200]})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          background: `linear-gradient(135deg, ${'#00A76F'} 30%, ${'#8E33FF'} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontSize: { xs: '2rem', md: '3rem' },
        }}
      >
        Choose Your Membership Plan
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Select a plan that fits your goals and unlock exclusive benefits.
      </Typography>

      {/* Cards */}
      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              component={m.div}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 200 }}
              sx={{
                textAlign: 'center',
                borderRadius: 4,
                boxShadow: 6,
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.95)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                {plan.icon}

                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, color: plan.color }}>
                  {plan.title} Membership
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mt: 1, mb: 2, color: theme.palette.text.primary }}
                >
                  {plan.price}
                </Typography>

                <List dense>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <Button
                component={m.button}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  mb: 2,
                  fontWeight: 'bold',
                  bgcolor: 'common.white',
                  color: 'text.primary',
                  border: `1.5px solid ${plan.color}`,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: plan.color,
                    opacity: 0.9,
                    color: 'common.white',
                  },
                }}
                onClick={() => alert(`🎉 You selected the ${plan.title} plan!`)}
              >
                Subscribe
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
