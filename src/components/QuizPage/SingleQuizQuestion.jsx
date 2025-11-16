'use client';

import { useParams } from 'next/navigation';
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

import Loading from 'src/app/loading';

import { shuffleArray, useAllQuizzes } from './QuizData';

// Utility: Shuffle questions
export default function SingleQuizQuestion() {
  const { id } = useParams();
  const { quizzes } = useAllQuizzes();

  // BASE STATES (hooks must be static!)
  const [quiz, setQuiz] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(0); // PER QUESTION TIMER
  const [showResult, setShowResult] = useState(false);

  const [showExplanation, setShowExplanation] = useState(false);

  // Load quiz
  useEffect(() => {
    if (!id || !quizzes) return;
    const foundQuiz = quizzes.find((q) => q.id.toString() === id);
    setQuiz(foundQuiz);
  }, [id, quizzes]);

  // Initialize quiz
  useEffect(() => {
    if (!quiz) return;

    const randomized = shuffleArray(quiz.all_questions).slice(0, quiz.total_questions);

    setQuestions(randomized);
    setCurrentIndex(0);
    setSelectedAnswer('');
    setScore(0);

    setTimer(randomized[0]?.qus_time || 30);
    setShowResult(false);
    setShowExplanation(false);
  }, [quiz]);

  const handleNext = useCallback(() => {
    if (!questions.length) return;
    const currentQ = questions[currentIndex];

    if (selectedAnswer === currentQ.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer('');
    setShowExplanation(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimer(questions[currentIndex + 1].qus_time || 30);
    } else {
      setShowResult(true);
    }
  }, [selectedAnswer, currentIndex, questions]);


  // TIMER (per question)
  useEffect(() => {
    if (!questions.length || showResult) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          handleNext();
          const nextTime = questions[currentIndex + 1]?.qus_time;
          return typeof nextTime === 'number' ? nextTime : 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questions.length, showResult, handleNext, currentIndex]);

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
    if (quiz.instant_feedback) {
      setShowExplanation(true);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prev) => prev - 1);
    setSelectedAnswer('');
    setShowExplanation(false);
    setTimer(questions[currentIndex - 1].qus_time || 30);
  };

  if (!quiz || !questions.length) {
    return (
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading />
      </Box>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <Box
      sx={{
        minHeight: '50vh',
        px: 2,
        py: 6,
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E9FDEB 0%, #D2FCD7 100%)',
      }}
    >
      <Container maxWidth="md">
        {!showResult ? (
          <>
            {/* HEADER */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentIndex === 0}
                sx={{
                  borderColor: '#3EAF6F',
                  color: '#2F8F58',
                  '&:hover': { borderColor: '#2F8F58', background: '#E6F9EC' },
                }}
              >
                Back
              </Button>

              <Typography fontWeight={700} color="#2F8F58">
                {quiz.title}
              </Typography>

              <Typography fontWeight={700} color="#2F8F58">
                ⏳ {timer}s
              </Typography>
            </Stack>

            {/* TIMER BAR */}
            <LinearProgress
              variant="determinate"
              value={currentQ?.qus_time ? (timer / currentQ.qus_time) * 100 : 0}
              sx={{
                mb: 3,
                height: 10,
                borderRadius: 5,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#34C759',
                },
              }}
            />

            <Typography variant="h6" fontWeight={700} color="#0A4621" mb={2}>
              Question {currentIndex + 1} / {questions.length}
            </Typography>

            {/* CARD */}
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 128, 0, 0.15)',
                background: '#FFFFFF',
              }}
            >
              <CardContent>
                <Typography fontWeight={700} mb={3} color="#145A32">
                  {currentQ.question}
                </Typography>

                {/* OPTIONS */}
                <Stack spacing={2}>
                  {currentQ.options.map((option) => {
                    const isSelected = selectedAnswer === option;

                    return (
                      <Button
                        key={option}
                        variant={isSelected ? 'contained' : 'outlined'}
                        disabled={
                          quiz.instant_feedback
                            ? selectedAnswer && selectedAnswer !== option
                            : false
                        }
                        onClick={() => handleSelect(option)}
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#3EAF6F',
                          color: isSelected ? '#FFFFFF' : '#2F8F58',
                          background: isSelected ? '#34C759' : '',
                          '&:hover': {
                            background: isSelected ? '#2FB150' : '#E7F9ED',
                          },
                        }}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Stack>

                {/* NO instant feedback → NEXT button */}
                {!quiz.instant_feedback && selectedAnswer && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      bgcolor: '#34C759',
                      '&:hover': { bgcolor: '#2FB150' },
                    }}
                    onClick={handleNext}
                  >
                    {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
                  </Button>
                )}

                {/* instant feedback view */}
                {quiz.instant_feedback && showExplanation && (
                  <Box
                    mt={3}
                    p={2}
                    sx={{
                      bgcolor: '#EAFDF1',
                      borderRadius: 2,
                      border: '1px solid #34C759',
                    }}
                  >
                    <Typography fontWeight={700} color="#145A32">
                      Explanation:
                    </Typography>

                    <Typography mt={1} color="#1B5E20">
                      {currentQ.explain}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: '#34C759',
                        '&:hover': { bgcolor: '#2FB150' },
                      }}
                      onClick={handleNext}
                    >
                      Continue
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          /* RESULT SCREEN */
          <Box textAlign="center">
            <Typography variant="h4" mb={2} color="#065F33">
              🎉 Quiz Complete!
            </Typography>

            <Typography variant="h5" color="#0B7438">
              Score: {score} / {questions.length}
            </Typography>

            {/* Show all explanations when instant_feedback = false */}
            {!quiz.instant_feedback && (
              <Box mt={4} p={3} sx={{ bgcolor: '#EAFDF1', borderRadius: 3 }}>
                <Typography variant="h6" mb={2} color="#145A32">
                  📘 Full Explanation Summary
                </Typography>

                {questions.map((q) => (
                  <Box
                    key={q.id}
                    mb={2}
                    p={2}
                    sx={{
                      borderBottom: '1px solid #C7EBD1',
                    }}
                  >
                    <Typography fontWeight={700}>{q.question}</Typography>
                    <Typography color="#2F8F58" mt={1}>
                      ✔ Correct: {q.correct_answer}
                    </Typography>
                    <Typography mt={1}>{q.explain}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#34C759',
                '&:hover': { bgcolor: '#2FB150' },
              }}
              onClick={() => {
                const shuffled = shuffleArray(quiz.all_questions).slice(0, quiz.total_questions);

                setQuestions(shuffled);
                setCurrentIndex(0);
                setSelectedAnswer('');
                setScore(0);
                setShowResult(false);
                setTimer(shuffled[0]?.qus_time || 30);
              }}
            >
              🔄 Try Again
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
