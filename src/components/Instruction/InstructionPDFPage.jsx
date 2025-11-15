'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

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

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';

import InteractiveButton from '../button/InteractiveButton';

export default function InstructionPDFPage({ onStartQuiz, id }) {
  // All hooks must be declared first
  const [currentPage, setCurrentPage] = useState(1);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [quizPdfInstruction, setQuizPdfInstruction] = useState(null);
  const [currentInstruction, setCurrentInstruction] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  const pdfUrl = '/pdf/quiz-instructions.pdf';
  const downloadFileName = 'Quiz-Instructions.pdf';

  const { get_quizzes: quizzesData } = useEndpoints();
  const { data: quizData, isLoading } = useApi(quizzesData, { fetch: true });

  // Hooks that depend on quizData
  useEffect(() => {
    if (quizData && id) {
      const quiz = quizData.find((q) => q.id.toString() === id.toString());
      if (quiz) {
        setQuizPdfInstruction(quiz);
        setCurrentInstruction(quiz.instruction?.find((i) => i.page === 1));
      }
    }
  }, [quizData, id]);

  useEffect(() => {
    if (quizPdfInstruction) {
      const pageData = quizPdfInstruction.instruction?.find((i) => i.page === currentPage);
      setCurrentInstruction(pageData);
    }
  }, [currentPage, quizPdfInstruction]);

  

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, quizPdfInstruction?.total_instruction_pages || 1));
  }, [quizPdfInstruction]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // 📥 Download PDF
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

  // 🧩 Iframe load
  const handleIframeLoad = useCallback(() => {
    setIsIframeLoading(false);
  }, []);

  // 🚀 Start Quiz
  const handleStartQuizClick = () => {
    router.push(`${pathname}/quizmode/`);
  };

  // ✅ Mobile layout
  if (isMobile) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
          p: 2,
        }}
      >
        <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
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

            {/* PDF Iframe */}
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
            {currentInstruction ? (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  {currentInstruction.title_en}
                </Typography>

                <Box
                  sx={{ typography: 'body1', lineHeight: 1.8, color: 'text.primary' }}
                  dangerouslySetInnerHTML={{ __html: currentInstruction.content }}
                />
              </>
            ) : (
              <Typography align="center" color="text.secondary">
                No instruction found.
              </Typography>
            )}

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

              {currentPage === quizPdfInstruction?.total_instruction_pages ? (
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

  // Desktop layout
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00A76F 0%, #118D57 100%)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Left: Instructions */}
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
            {currentInstruction ? (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  {currentInstruction.title_en}
                </Typography>

                <Box
                  sx={{
                    typography: 'body1',
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                  dangerouslySetInnerHTML={{ __html: currentInstruction.content }}
                />
              </>
            ) : (
              <Typography color="text.secondary" align="center">
                No instruction found.
              </Typography>
            )}
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

            {currentPage === quizPdfInstruction?.total_instruction_pages ? (
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

      {/* Right: PDF Viewer */}
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

        {/* PDF Iframe */}
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

