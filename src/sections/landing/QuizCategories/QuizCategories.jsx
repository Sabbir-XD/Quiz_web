'use client';

import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Grid, Button, Typography } from '@mui/material';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';

export default function OurQuizServices() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { get_quizzes: quizUrl } = useEndpoints();

  const {
    data: quizzes,
    error,
    isLoading,
    mutate,
  } = useApi(quizUrl, {
    fetch: true,
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  // Array of colors/gradients for dynamic styling
  const gradients = [
    { gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)', border: '#1565C0' },
    { gradient: 'linear-gradient(135deg, #00897B, #4DB6AC)', border: '#00897B' },
    { gradient: 'linear-gradient(135deg, #EF6C00, #FFB74D)', border: '#EF6C00' },
    { gradient: 'linear-gradient(135deg, #7B1FA2, #BA68C8)', border: '#7B1FA2' },
    { gradient: 'linear-gradient(135deg, #0288D1, #4FC3F7)', border: '#0288D1' },
    { gradient: 'linear-gradient(135deg, #43A047, #81C784)', border: '#43A047' },
    { gradient: 'linear-gradient(135deg, #E53935, #EF9A9A)', border: '#E53935' },
    { gradient: 'linear-gradient(135deg, #3949AB, #7986CB)', border: '#3949AB' },
    { gradient: 'linear-gradient(135deg, #00838F, #4DD0E1)', border: '#00838F' },
    { gradient: 'linear-gradient(135deg, #6A1B9A, #AB47BC)', border: '#6A1B9A' },
  ];

  const handleQuizInstruction = (id) => {
    console.log('quiz id patah', id);
    router.push(`/${locale}/instructions/${id}`);
  };

  if (isLoading) return <Loading />;

  if (error)
    return <Box sx={{ p: 3, textAlign: 'center' }}>⚠️ Failed to load quizzes. Please refresh.</Box>;

  // Map quizzes with random gradient for styling
  const quizzesWithColors = quizzes.map((quiz) => {
    const randomColor = gradients[Math.floor(Math.random() * gradients.length)];
    return {
      ...quiz,
      gradient: randomColor.gradient,
      borderColor: randomColor.border,
      icon: quiz.icon || 'mdi:book-open-page-variant', // fallback icon if backend doesn't provide
    };
  });

  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: `linear-gradient(135deg, ${'#00A76F'} 30%, ${'#8E33FF'} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          🌟 Our Quiz Services
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.15rem' },
          }}
        >
          Test your skills, improve your knowledge, and prepare for success with our interactive
          quizzes.
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3} justifyContent="center">
        {quizzesWithColors.map((quiz, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={2.4} // custom 5 per row
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 250,
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                backgroundColor: '#fff',
                borderTop: `5px solid ${quiz.borderColor}`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: quiz.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                <Icon icon={quiz.icon} width="30" height="30" color="#fff" />
              </Box>

              {/* Title */}
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1e293b', mb: 1 }}>
                {quiz.title}
              </Typography>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                {quiz.description}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                onClick={() => handleQuizInstruction(quiz?.id)}
                sx={{
                  background: quiz.gradient,
                  color: '#fff',
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 2,
                  py: 0.8,
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                Start Quiz
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
