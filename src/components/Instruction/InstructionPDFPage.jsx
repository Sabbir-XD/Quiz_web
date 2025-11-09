'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Card,
  Button,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import InteractiveButton from '../button/InteractiveButton';

export default function InstructionPDFPage({ onStartQuiz, id }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  const pdfUrl = '/pdf/quiz-instructions.pdf';
  const downloadFileName = 'Quiz-Instructions.pdf';

  console.log(id);

  // Constants
  const TOTAL_PAGES = 3;
 
  // PDF content data
  const pdfPages = useMemo(
    () => [
      // 🔹 Quiz 1
      [
        {
          quiz: { id: 1, title: 'Science Basics' },
        },
        {
          page: 1,
          title: '📚 Quiz Instructions',
          content: [
            'Welcome to the Science Basics quiz!',
            'Test your knowledge of general science facts.',
            'Each question has one correct answer.',
            'Read carefully before choosing.',
          ],
        },
        {
          page: 2,
          title: '⏰ Time Management',
          content: [
            'You have 30 seconds per question.',
            'The timer will be visible on screen.',
            'If time expires, it will auto-skip.',
            'Stay focused for best results.',
          ],
        },
        {
          page: 3,
          title: '🎯 Scoring & Results',
          content: [
            'Each correct answer = 1 point.',
            'No negative marking.',
            'Results show instantly after completion.',
            'Review your answers anytime.',
          ],
        },
      ],

      // 🔹 Quiz 2
      [
        {
          quiz: { id: 2, title: 'Math Challenge' },
        },
        {
          page: 1,
          title: '📚 Quiz Instructions',
          content: [
            'Welcome to the Math Challenge!',
            'Sharpen your problem-solving skills.',
            'Only one correct answer per question.',
            'Double-check your calculations.',
          ],
        },
        {
          page: 2,
          title: '⏰ Time Management',
          content: [
            'Each question has 45 seconds.',
            'Avoid spending too long on one question.',
            'The quiz will auto-skip after timeout.',
            'Stay calm and focused.',
          ],
        },
        {
          page: 3,
          title: '🎯 Scoring & Results',
          content: [
            'Correct = 2 points.',
            'No deduction for wrong answers.',
            'Instant results after submission.',
            'You can view your score summary.',
          ],
        },
      ],

      // 🔹 Quiz 3
      [
        {
          quiz: { id: 3, title: 'History Explorer' },
        },
        {
          page: 1,
          title: '📚 Quiz Instructions',
          content: [
            'Welcome to the History Explorer quiz!',
            'Learn and test your historical knowledge.',
            'Each question is multiple-choice.',
            'Take your time to recall facts.',
          ],
        },
        {
          page: 2,
          title: '⏰ Time Management',
          content: [
            'You have 40 seconds per question.',
            'Timer visible at the top.',
            'Auto-advance when time runs out.',
            'Manage your pace carefully.',
          ],
        },
        {
          page: 3,
          title: '🎯 Scoring & Results',
          content: [
            'Correct = 1 point.',
            'No penalty for mistakes.',
            'Results display instantly.',
            'Check correct answers afterward.',
          ],
        },
      ],

      // 🔹 Quiz 4
      [
        {
          quiz: { id: 4, title: 'English Vocabulary Test' },
        },
        {
          page: 1,
          title: '📚 Quiz Instructions',
          content: [
            'Welcome to the English Vocabulary Test!',
            'Improve your word knowledge.',
            'Choose the most appropriate meaning.',
            'One correct answer per question.',
          ],
        },
        {
          page: 2,
          title: '⏰ Time Management',
          content: [
            '30 seconds for each question.',
            'Timer visible during quiz.',
            'Auto-next if time expires.',
            'Plan your time well.',
          ],
        },
        {
          page: 3,
          title: '🎯 Scoring & Results',
          content: [
            '1 point per correct answer.',
            'No negative marks.',
            'Instant feedback on completion.',
            'You can review missed words later.',
          ],
        },
      ],
    ],
    []
  );

  const currentPdfPage = useMemo(() => {
    // Find the quiz pages matching the given id
    const quizPages = pdfPages.find((quizSet) => quizSet[0].quiz.id.toString() === id.toString());
    return quizPages ? quizPages.find((p) => p.page === currentPage) || quizPages[1] : null;
  }, [currentPage, pdfPages, id]);

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // Download PDF handler
  const downloadPDF = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = downloadFileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  }, [pdfUrl, downloadFileName]);

  // Iframe load handler
  const handleIframeLoad = useCallback(() => {
    setIsIframeLoading(false);
  }, []);

  // Handle start quiz button click
  const handleStartQuizClick = () => {
    router.push(`${pathname}/quizmode/`);
  };

  // Mobile layout - stacked vertically
  if (isMobile) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
          p: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                PDF Viewer
              </Typography>
              <Tooltip title="Download PDF">
                <IconButton
                  onClick={downloadPDF}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* PDF Iframe Preview */}
            <Box
              sx={{
                border: '2px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden',
                height: '300px',
                position: 'relative',
              }}
            >
              {isIframeLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Quiz Instructions PDF"
                onLoad={handleIframeLoad}
              />
            </Box>
          </Box>
        </Card>

        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3,
                textAlign: 'center',
              }}
            >
              {currentPdfPage.title}
            </Typography>

            {currentPdfPage.content.map((line, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ mb: 2, lineHeight: 1.8, color: 'text.primary' }}
              >
                {index + 1}. {line}
              </Typography>
            ))}

            {/* Navigation */}
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="outlined"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                sx={{ borderRadius: '25px', px: 4, textTransform: 'none', flex: 1 }}
              >
                ← Previous
              </Button>

              {currentPage === TOTAL_PAGES ? (
                <InteractiveButton
                  color="success"
                  size="large"
                  fullWidth
                  sx={{ flex: 1 }}
                  onClick={handleStartQuizClick}
                >
                  🚀 Start Quiz
                </InteractiveButton>
              ) : (
                <InteractiveButton onClick={goToNextPage} size="large" fullWidth sx={{ flex: 1 }}>
                  Next →
                </InteractiveButton>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    );
  }

  // Desktop layout - side by side
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Left Side - Fixed Instructions */}
      <Box
        sx={{
          width: '40%',
          height: '90vh',
          background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
        }}
      >
        <Card
          sx={{
            height: '100%',
            borderRadius: 0,
            boxShadow: 'none',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3,
                textAlign: 'center',
              }}
            >
              {currentPdfPage.title}
            </Typography>

            {currentPdfPage.content.map((line, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ mb: 2, lineHeight: 1.8, color: 'text.primary' }}
              >
                {index + 1}. {line}
              </Typography>
            ))}
          </Box>

          {/* Navigation */}
          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              sx={{ borderRadius: '25px', px: 4, textTransform: 'none' }}
            >
              ← Previous
            </Button>

            {currentPage === TOTAL_PAGES ? (
              <InteractiveButton color="success" size="large" onClick={handleStartQuizClick}>
                🚀 Start Quiz
              </InteractiveButton>
            ) : (
              <InteractiveButton onClick={goToNextPage} size="large">
                Next →
              </InteractiveButton>
            )}
          </Box>
        </Card>
      </Box>

      {/* Right Side - PDF Viewer */}
      <Box
        sx={{
          width: '70%',
          backgroundColor: '#fff',
          p: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            PDF Viewer
          </Typography>

          <Tooltip title="Download PDF">
            <IconButton
              onClick={downloadPDF}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* PDF Iframe Preview */}
        <Box
          sx={{
            border: '2px solid #e0e0e0',
            borderRadius: 0,
            overflow: 'hidden',
            height: '100vh',
            position: 'relative',
          }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Quiz Instructions PDF"
            onLoad={handleIframeLoad}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Scroll through the PDF to view all pages
        </Typography>
      </Box>
    </Box>
  );
}
