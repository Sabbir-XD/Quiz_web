'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Card, Stack, Button, useTheme, Typography, useMediaQuery } from '@mui/material';

export default function QuizModeSelection({ onModeSelect }) {
  const [selectedMode, setSelectedMode] = useState(null);
  console.log(selectedMode);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const modes = [
    {
      id: 'single',
      route: `${pathname}/singleQuizQuestion/`,
      title: 'Single Question Mode',
      description: 'Answer one question at a time with 30-second timer',
      icon: '📄',
      color: '#00A76F',
      features: ['⏱ Timer per question', '📊 Instant feedback', '🎯 Focus on one at a time'],
    },
    {
      id: 'all',
      route: `${pathname}/allQuizQuestions/`,
      title: 'All Questions Mode',
      description: 'View and answer all questions on one page',
      icon: '📋',
      color: '#1976d2',
      features: ['📝 See all questions', '⏰ No time pressure', '🔄 Review before submit'],
    },
  ];

  const handleContinue = () => {
    const selected = modes.find((mode) => mode.id === selectedMode);
    if (selected) {
      // Navigate to the selected route
      router.push(selected.route);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 1000,
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" align="center" fontWeight={700} mb={1}>
          🎯 Choose Your Quiz Mode
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={5}>
          Select how you want to take the quiz
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
          {modes.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <Card
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                sx={{
                  flex: 1,
                  p: 3,
                  cursor: 'pointer',
                  border: '3px solid',
                  borderColor: isSelected ? mode.color : 'grey.300',
                  bgcolor: isSelected ? `${mode.color}15` : 'white',
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  position: 'relative',
                  boxShadow: isSelected
                    ? '0 8px 24px rgba(0,0,0,0.15)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                    borderColor: mode.color,
                  },
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      bgcolor: mode.color,
                      color: 'white',
                      borderRadius: '50%',
                      width: 30,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                    }}
                  >
                    ✓
                  </Box>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: { xs: '3rem', md: '4rem' },
                    color: mode.color,
                  }}
                >
                  {mode.icon}
                </Box>

                <Typography
                  variant="h6"
                  align="center"
                  fontWeight={600}
                  mb={1}
                  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                >
                  {mode.title}
                </Typography>

                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                  mb={2}
                  sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
                >
                  {mode.description}
                </Typography>

                <Stack spacing={0.5} mt={2}>
                  {mode.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Stack>
              </Card>
            );
          })}
        </Stack>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!selectedMode}
          onClick={handleContinue}
          sx={{
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            background: selectedMode
              ? 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)'
              : undefined,
            bgcolor: selectedMode ? undefined : 'grey.300',
            '&:hover': {
              background: selectedMode
                ? 'linear-gradient(135deg, #118D57 0%, #00A76F 100%)'
                : undefined,
              transform: selectedMode ? 'scale(1.02)' : 'none',
              boxShadow: selectedMode ? '0 6px 20px rgba(0,167,111,0.3)' : 'none',
            },
            transition: 'all 0.3s',
          }}
        >
          {selectedMode ? '🚀 Start Quiz' : 'Select a mode to continue'}
        </Button>
      </Card>
    </Box>
  );
}
