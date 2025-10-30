'use client';

import { useState } from 'react';

import { Box, Card, Stack, Button, Typography, CardContent } from '@mui/material';

import { shuffleArray, ALL_QUESTIONS } from './QuizData';

export default function AllQuizQuestions() {
  const [questions] = useState(shuffleArray(ALL_QUESTIONS));
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id, answer) => setAnswers({ ...answers, [id]: answer });
  const handleSubmit = () => setShowResult(true);
  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);

  return (
    <Box
      sx={{
        minHeight: '60vh',
        px: { xs: 2, md: 10 },
        py: 5,
        background: 'linear-gradient(135deg, #f9f9fc 0%, #e0f7fa 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!showResult ? (
        <>
          <Typography
            variant="h3"
            mb={5}
            textAlign="center"
            sx={{ fontWeight: 'bold', color: '#00796b' }}
          >
            Interactive Quiz
          </Typography>

          <Stack spacing={4} sx={{ width: '100%', maxWidth: 700 }}>
            {questions.map((q, index) => (
              <Card
                key={q.id}
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 12 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" mb={2} sx={{ fontWeight: 500 }}>
                    {index + 1}. {q.question}
                  </Typography>

                  <Stack spacing={2}>
                    {q.options.map((option) => {
                      const isSelected = answers[q.id] === option;
                      const correct = q.correctAnswer === option;
                      const showCorrect = showResult && (isSelected || correct);

                      return (
                        <Button
                          key={option}
                          variant={isSelected ? 'contained' : 'outlined'}
                          onClick={() => handleSelect(q.id, option)}
                          sx={{
                            justifyContent: 'flex-start',
                            borderColor: showCorrect
                              ? correct
                                ? '#43a047'
                                : '#e53935'
                              : 'grey.300',
                            bgcolor: showCorrect
                              ? correct
                                ? '#e8f5e9'
                                : '#ffebee'
                              : isSelected
                                ? '#00796b'
                                : 'white',
                            color: showCorrect
                              ? correct
                                ? '#2e7d32'
                                : '#c62828'
                              : isSelected
                                ? 'white'
                                : '#424242',
                            '&:hover': { bgcolor: isSelected ? '#00695c' : '#f1f1f1' },
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: 1,
                            py: 1.5,
                          }}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 5,
              py: 1.8,
              fontSize: 18,
              fontWeight: 600,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
              borderRadius: 3,
            }}
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit Quiz
          </Button>
        </>
      ) : (
        <Box textAlign="center" sx={{ mt: 10 }}>
          <Typography variant="h3" mb={2} sx={{ fontWeight: 'bold', color: '#00796b' }}>
            🎉 Quiz Complete!
          </Typography>
          <Typography variant="h5" mb={4}>
            Your Score: <strong>{score}</strong> / {questions.length}
          </Typography>

          <Button
            variant="contained"
            sx={{
              py: 1.5,
              px: 4,
              fontSize: 16,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
            }}
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
          >
            Retake Quiz
          </Button>
        </Box>
      )}
    </Box>
  );
}
