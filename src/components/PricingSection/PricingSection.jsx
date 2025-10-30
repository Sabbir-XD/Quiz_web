'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Icon } from '@iconify/react';

import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Grid,
  Card,
  Chip,
  Button,
  Divider,
  Container,
  Typography,
  CardContent,
} from '@mui/material';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        '10 Quizzes per month',
        'Basic Subject Access',
        'Limited Question Bank',
        'Community Support',
        'Basic Analytics',
        'Advertisement Supported',
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outlined',
      color: '#6366F1',
      icon: 'mdi:rocket-launch',
    },
    {
      name: 'Pro',
      description: 'Most popular for serious learners',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      popular: true,
      features: [
        'Unlimited Quizzes',
        'All Subjects Access',
        'Full Question Bank',
        'Priority Support',
        'Advanced Analytics',
        'No Advertisements',
        'Download Certificates',
        'Custom Quiz Creation',
      ],
      buttonText: 'Go Pro',
      buttonVariant: 'contained',
      color: '#10B981',
      icon: 'mdi:crown',
    },
    {
      name: 'Premium',
      description: 'For institutions & organizations',
      monthlyPrice: 599,
      yearlyPrice: 5990,
      popular: false,
      features: [
        'Everything in Pro',
        'Multiple User Accounts',
        'Progress Tracking',
        'Custom Branding',
        'API Access',
        'Dedicated Support',
        'Bulk User Management',
        'Advanced Reporting',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined',
      color: '#F59E0B',
      icon: 'mdi:star-circle',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <m.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<StarIcon />}
              label="Most Popular Plan"
              sx={{
                backgroundColor: '#10B981',
                color: 'white',
                mb: 2,
                fontWeight: 'bold',
              }}
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
              Choose Your Plan
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Start learning today with our flexible pricing plans. Cancel anytime.
            </Typography>

            {/* Billing Toggle */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '50px',
                p: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <Button
                onClick={() => setBillingCycle('monthly')}
                sx={{
                  borderRadius: '25px',
                  px: 4,
                  py: 1,
                  backgroundColor: billingCycle === 'monthly' ? '#6366F1' : 'transparent',
                  color: billingCycle === 'monthly' ? 'white' : 'text.primary',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: billingCycle === 'monthly' ? '#6366F1' : 'grey.100',
                  },
                }}
              >
                Monthly
              </Button>
              <Button
                onClick={() => setBillingCycle('yearly')}
                sx={{
                  borderRadius: '25px',
                  px: 4,
                  py: 1,
                  backgroundColor: billingCycle === 'yearly' ? '#10B981' : 'transparent',
                  color: billingCycle === 'yearly' ? 'white' : 'text.primary',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: billingCycle === 'yearly' ? '#10B981' : 'grey.300',
                  },
                }}
              >
                Yearly
                <Chip
                  label="Save 17%"
                  size="small"
                  sx={{
                    ml: 1,
                    backgroundColor: '#FFD700',
                    color: 'black',
                    fontSize: '0.6rem',
                    height: 20,
                  }}
                />
              </Button>
            </Box>
          </Box>
        </m.div>

        {/* Pricing Cards */}
        <m.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <m.div variants={cardVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: plan.popular
                        ? '0 20px 40px rgba(16, 185, 129, 0.15)'
                        : '0 8px 24px rgba(0,0,0,0.1)',
                      border: plan.popular ? '2px solid #10B981' : '1px solid rgba(0,0,0,0.08)',
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: plan.popular
                          ? '0 25px 50px rgba(16, 185, 129, 0.2)'
                          : '0 15px 35px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    {plan.popular && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#10B981',
                          color: 'white',
                          px: 3,
                          py: 0.5,
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                        }}
                      >
                        MOST POPULAR
                      </Box>
                    )}

                    <CardContent
                      sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      {/* Plan Header */}
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${plan.color}30, ${plan.color}60)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                          }}
                        >
                          <Icon icon={plan.icon} width="30" height="30" color={plan.color} />
                        </Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                          {plan.name}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                          {plan.description}
                        </Typography>
                      </Box>

                      {/* Price */}
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h2" fontWeight="bold" sx={{ color: plan.color }}>
                          ৳{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </Typography>
                        <Typography color="text.secondary">
                          {billingCycle === 'monthly' ? 'per month' : 'per year'}
                        </Typography>
                        {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                            Save ৳{(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()}
                          </Typography>
                        )}
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Features */}
                      <Box sx={{ flex: 1, mb: 3 }}>
                        {plan.features.map((feature, featureIndex) => (
                          <m.div key={featureIndex} variants={featureVariants}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckIcon
                                sx={{
                                  color: plan.color,
                                  mr: 2,
                                  fontSize: '1.2rem',
                                }}
                              />
                              <Typography variant="body2">{feature}</Typography>
                            </Box>
                          </m.div>
                        ))}
                      </Box>

                      {/* CTA Button */}
                      <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          fullWidth
                          variant={plan.buttonVariant}
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            py: 1.5,
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            backgroundColor: plan.popular ? plan.color : 'transparent',
                            borderColor: plan.color,
                            color: plan.popular ? 'white' : plan.color,
                            '&:hover': {
                              backgroundColor: plan.color,
                              color: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 20px ${plan.color}40`,
                            },
                          }}
                        >
                          {plan.buttonText}
                        </Button>
                      </m.div>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </m.div>

        {/* FAQ Section */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mt: 10, mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Frequently Asked Questions
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                question: 'Can I change plans anytime?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'Is there a free trial?',
                answer:
                  'The Basic plan is completely free forever. For Pro and Premium, we offer a 7-day free trial.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept bKash, Nagad, Rocket, credit cards, and bank transfers.',
              },
              {
                question: 'Can I cancel my subscription?',
                answer: 'Yes, you can cancel anytime. No questions asked.',
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 1 }}
                >
                  <Card sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                      {faq.question}
                    </Typography>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </m.div>
      </Container>
    </Box>
  );
}
