'use client';

import { m } from 'framer-motion';
import React, { useState } from 'react';

import { Box, Card, Button, Typography, CardContent, LinearProgress } from '@mui/material';

export default function QuizSection() {
  const questions = [
    {
      question: 'Which language is primarily used to build React applications?',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      correct: 1,
    },
    {
      question: "What does 'MUI' stand for in Material UI?",
      options: ['Modern User Interface', 'Material User Interface', 'Mobile UI', 'Motion UI'],
      correct: 1,
    },
    {
      question: 'Which hook is used for managing state in React?',
      options: ['useClass', 'useData', 'useState', 'useFetch'],
      correct: 2,
    },
    {
      question: 'Next.js is mainly used for?',
      options: ['Mobile apps', 'Server-side rendering', 'Game development', 'AI models'],
      correct: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[current].correct) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent( current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #E3F2FD, #D3FCD2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Card
        component={m.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: 'white',
          p: 3,
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          {!showResult ? (
            <>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Question {current + 1} of {questions.length}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={((current + 1) / questions.length) * 100}
                sx={{ mb: 3, borderRadius: 2 }}
              />

              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                {questions[current].question}
              </Typography>

              <Box>
                {questions[current].options.map((option, index) => {
                  const isCorrect = index === questions[current].correct;
                  const isSelected = selected === index;
                  return (
                    <Button
                      key={index}
                      fullWidth
                      variant={isSelected ? 'contained' : 'outlined'}
                      color={isSelected ? (isCorrect ? 'success' : 'error') : 'primary'}
                      onClick={() => handleAnswer(index)}
                      disabled={selected !== null}
                      component={m.button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      sx={{
                        mb: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        py: 1.2,
                        fontSize: '1rem',
                      }}
                    >
                      {option}
                    </Button>
                  );
                })}
              </Box>
            </>
          ) : (
            <Box
              component={m.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: '#1a237e' }}>
                🎉 Quiz Completed!
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Your Score: {score} / {questions.length}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={restartQuiz}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                }}
              >
                Restart Quiz
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
