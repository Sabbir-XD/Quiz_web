'use client';

import { Icon } from '@iconify/react';

import { Box, Grid, Button, Typography } from '@mui/material';

export default function OurQuizServices() {
  const categories = [
  
    { 
      quiz: {
        id: 'id',
        title: 'BCS Preparation'
      },
      title: 'BCS Preparation',
      description: 'Practice model tests & previous year questions for BCS exams.',
      icon: 'mdi:book-open-page-variant',
      gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)',
      borderColor: '#1565C0',
    },
    {
      title: 'IELTS Practice',
      description: 'Boost your listening, reading, writing & speaking skills.',
      icon: 'mdi:earth',
      gradient: 'linear-gradient(135deg, #00897B, #4DB6AC)',
      borderColor: '#00897B',
    },
    {
      title: 'Govt Job Quiz',
      description: 'Prepare for all types of government job recruitment exams.',
      icon: 'mdi:briefcase',
      gradient: 'linear-gradient(135deg, #EF6C00, #FFB74D)',
      borderColor: '#EF6C00',
    },
    {
      title: 'Admission Test Quiz',
      description: 'Get ready for university & medical admission exams.',
      icon: 'mdi:school',
      gradient: 'linear-gradient(135deg, #7B1FA2, #BA68C8)',
      borderColor: '#7B1FA2',
    },
    {
      title: 'Programming Quiz',
      description: 'Sharpen your coding & computer science fundamentals.',
      icon: 'mdi:code-tags',
      gradient: 'linear-gradient(135deg, #0288D1, #4FC3F7)',
      borderColor: '#0288D1',
    },
    {
      title: 'General Knowledge',
      description: 'Expand your awareness with current affairs & GK quizzes.',
      icon: 'mdi:lightbulb-on-outline',
      gradient: 'linear-gradient(135deg, #43A047, #81C784)',
      borderColor: '#43A047',
    },
    {
      title: 'Current Affairs',
      description: 'Stay up to date with daily national and international news.',
      icon: 'mdi:newspaper-variant-outline',
      gradient: 'linear-gradient(135deg, #E53935, #EF9A9A)',
      borderColor: '#E53935',
    },
    {
      title: 'Math Practice',
      description: 'Improve your math skills with logical and analytical quizzes.',
      icon: 'mdi:calculator-variant',
      gradient: 'linear-gradient(135deg, #3949AB, #7986CB)',
      borderColor: '#3949AB',
    },
    {
      title: 'English Grammar',
      description: 'Enhance your grammar and vocabulary through fun quizzes.',
      icon: 'mdi:alphabetical-variant',
      gradient: 'linear-gradient(135deg, #00838F, #4DD0E1)',
      borderColor: '#00838F',
    },
    {
      title: 'Science Quiz',
      description: 'Challenge yourself with interesting science questions.',
      icon: 'mdi:atom-variant',
      gradient: 'linear-gradient(135deg, #6A1B9A, #AB47BC)',
      borderColor: '#6A1B9A',
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 3, md: 8 },
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
        {categories.map((cat, index) => (
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
                maxWidth: 230,
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                backgroundColor: '#fff',
                borderTop: `5px solid ${cat.borderColor}`,
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
                  background: cat.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                <Icon icon={cat.icon} width="30" height="30" color="#fff" />
              </Box>

              {/* Title */}
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1e293b', mb: 1 }}>
                {cat.title}
              </Typography>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                {cat.description}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  background: cat.gradient,
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
