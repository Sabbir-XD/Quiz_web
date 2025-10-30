'use client';

import { useState } from 'react';
import { m } from 'framer-motion';

import { Star, Group, PlayArrow, TrendingUp, EmojiEvents, CheckCircle } from '@mui/icons-material';
import {
  Box,
  Grid,
  Chip,
  alpha,
  Button,
  Avatar,
  useTheme,
  Container,
  Typography,
  AvatarGroup,
} from '@mui/material';

export default function QuizConversionSection() {
  const theme = useTheme();
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Social proof data
  const successStats = [
    { number: '50K+', label: 'Active Quiz Takers' },
    { number: '95%', label: 'Report Better Knowledge' },
    { number: '10K+', label: 'Quizzes Available' },
  ];

  const userTestimonials = [
    { name: 'Sarah M.', score: '98%', quiz: 'Advanced JavaScript' },
    { name: 'Alex K.', score: '95%', quiz: 'Data Science Fundamentals' },
    { name: 'Priya R.', score: '99%', quiz: 'Web Development Mastery' },
  ];

  const features = [
    { icon: <TrendingUp />, text: 'Personalized Progress Tracking' },
    { icon: <EmojiEvents />, text: 'Compete in Global Leaderboards' },
    { icon: <Group />, text: 'Join Community Challenges' },
    { icon: <Star />, text: 'Exclusive Premium Quizzes' },
  ];

  const handleSubscription = async () => {
    setIsSubscribing(true);
    // Simulate subscription process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('User subscribed to quizzes');
    setIsSubscribing(false);
    // Handle actual subscription logic
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Content - Persuasive Text */}
          <Grid item xs={12} md={6}>
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <Chip
                icon={<TrendingUp />}
                label="MOST POPULAR QUIZ PLATFORM"
                color="primary"
                variant="filled"
                sx={{ mb: 3, fontWeight: 'bold' }}
              />

              {/* Main Heading */}
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Join Thousands Who Master Skills Through Our Quizzes
              </Typography>

              {/* Subheading */}
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Discover why <strong>50,000+ learners</strong> choose our platform to test their
                knowledge, compete with peers, and track their learning journey with unique,
                engaging quizzes you won&apos;t find anywhere else.
              </Typography>

              {/* Success Stories */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Recent Success Stories:
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}
                >
                  {userTestimonials.map((user, index) => (
                    <Chip
                      key={index}
                      avatar={
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                          {user.score}
                        </Avatar>
                      }
                      label={`${user.name} - ${user.quiz}`}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              {/* Features List */}
              <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle
                      sx={{
                        color: theme.palette.success.main,
                        mr: 2,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body1">{feature.text}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Subscription Button */}
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubscription}
                  disabled={isSubscribing}
                  startIcon={isSubscribing ? null : <PlayArrow />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    background: 'common.black',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    '&:hover': {
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {isSubscribing ? 'Getting Access...' : 'Start Quiz Journey Now'}
                </Button>
              </m.div>

              {/* Trust Indicator */}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                ✅ No credit card required • 7-day free trial • Cancel anytime
              </Typography>
            </m.div>
          </Grid>

          {/* Right Content - Social Proof & Stats */}
          <Grid item xs={12} md={6}>
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Stats Cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {successStats.map((stat, index) => (
                  <m.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </m.div>
                ))}
              </Box>

              {/* Active Users Section */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Join our active community
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}
                >
                  <AvatarGroup max={6}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>
                      S
                    </Avatar>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.secondary.main }}>
                      A
                    </Avatar>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.success.main }}>
                      P
                    </Avatar>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.warning.main }}>
                      M
                    </Avatar>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.error.main }}>
                      J
                    </Avatar>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.info.main }}>
                      R
                    </Avatar>
                  </AvatarGroup>
                  <Typography variant="body2" fontWeight="medium">
                    +2,345 joined this week
                  </Typography>
                </Box>
              </Box>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
