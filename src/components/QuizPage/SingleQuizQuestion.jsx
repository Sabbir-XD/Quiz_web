'use client';

import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';

import { shuffleArray, ALL_QUESTIONS, TIMER_DURATION, TOTAL_QUESTIONS } from './QuizData';

export default function SingleQuizQuestion() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(ALL_QUESTIONS).slice(0, TOTAL_QUESTIONS));
  }, []);

  // useEffect(() => {
  //   if (timer <= 0) handleNext();
  //   const interval = setInterval(() => setTimer((t) => t - 1), 1000);
  //   return () => clearInterval(interval);
  // }, [timer, currentIndex]);

  // const handleSelect = (answer) => setSelectedAnswer(answer);

  // const handleNext = () => {
  //   if (selectedAnswer === questions[currentIndex].correctAnswer) setScore((prev) => prev + 1);
  //   setSelectedAnswer('');
  //   setTimer(TIMER_DURATION);

  //   if (currentIndex + 1 < questions?.length) setCurrentIndex(currentIndex + 1);
  //   else setShowResult(true);
  // };

  // ✅ Stable function (no re-creation every render)
  const handleNext = useCallback(() => {
    if (selectedAnswer === questions[currentIndex]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer('');
    setTimer(TIMER_DURATION);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [selectedAnswer, questions, currentIndex]);

  const handleSelect = (answer) => setSelectedAnswer(answer);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer('');
      setTimer(TIMER_DURATION);
    }
  };

  // Timer logic (safe)
  useEffect(() => {
    if (timer <= 0) handleNext();

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, currentIndex, handleNext]);

  if (!questions.length) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
        px: 2,
        py: 6,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: { xs: '100%', sm: '90%', md: '75%' },
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        {!showResult ? (
          <>
            {/* Top Controls */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#118D57',
                  borderColor: '#118D57',
                  '&:hover': { borderColor: '#00A76F', bgcolor: '#e8f5ee' },
                }}
                onClick={handleBack}
                disabled={currentIndex === 0}
              >
                Back
              </Button>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Time Left: {timer}s
              </Typography>
            </Stack>

            {/* Progress */}
            <LinearProgress
              variant="determinate"
              value={(timer / TIMER_DURATION) * 100}
              sx={{
                mb: 3,
                height: 8,
                borderRadius: 4,
                bgcolor: '#e0e0e0',
                '& .MuiLinearProgress-bar': { bgcolor: '#00A76F' },
              }}
            />

            {/* Question */}
            <Typography variant="h6" mb={3} sx={{ fontWeight: 700, color: '#118D57' }}>
              Question {currentIndex + 1} of {questions.length}
            </Typography>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                transition: '0.3s',
                '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' },
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" mb={2} sx={{ fontWeight: 600, color: '#333' }}>
                  {questions[currentIndex].question}
                </Typography>

                <Stack spacing={2}>
                  {questions[currentIndex].options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const correct = questions[currentIndex].correctAnswer === option;
                    const showCorrect = selectedAnswer && (isSelected || correct);

                    return (
                      <Button
                        key={option}
                        variant={isSelected ? 'contained' : 'outlined'}
                        disabled={!!selectedAnswer && !isSelected}
                        onClick={() => handleSelect(option)}
                        sx={{
                          justifyContent: 'flex-start',
                          borderColor: showCorrect ? (correct ? '#118D57' : '#D32F2F') : 'grey.400',
                          bgcolor: showCorrect
                            ? correct
                              ? '#e0f4ea'
                              : '#fdecea'
                            : isSelected
                              ? '#118D57'
                              : 'white',
                          color: showCorrect
                            ? correct
                              ? '#118D57'
                              : '#D32F2F'
                            : isSelected
                              ? 'white'
                              : 'black',
                          '&:hover': {
                            bgcolor: isSelected ? '#0C8B4D' : '#f4f4f4',
                          },
                          textTransform: 'none',
                          borderRadius: 2,
                          fontSize: '0.95rem',
                          py: 1.3,
                        }}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Stack>

                {selectedAnswer && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: '#118D57',
                      '&:hover': { bgcolor: '#0C8B4D' },
                      borderRadius: 2,
                      py: 1.2,
                      fontWeight: 600,
                    }}
                    onClick={handleNext}
                  >
                    {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Box textAlign="center" sx={{ mt: 6 }}>
            <Typography variant="h4" mb={2} sx={{ color: '#118D57', fontWeight: 700 }}>
              🎉 Quiz Complete!
            </Typography>
            <Typography variant="h5" sx={{ color: '#333' }}>
              Your Score: {score} / {questions.length}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#118D57',
                '&:hover': { bgcolor: '#0C8B4D' },
                borderRadius: 2,
              }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
