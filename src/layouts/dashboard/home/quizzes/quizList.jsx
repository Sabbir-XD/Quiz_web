'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import {
  Box,
  Stack,
  Button,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Collapse,
  Divider
} from '@mui/material';

import { useEndpoints } from 'src/utils/useEndpoints';
import useApi from 'src/api/api';
import Loading from 'src/app/loading';
import { ConfirmDialog } from 'src/layouts/components/sooner/ConfirmDialog';

// ------------------------------------------------------------

export default function QuizList({ onCreate, onEdit }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { get_quizzes: quizUrl } = useEndpoints();

  const { data: quizzes, error, isLoading, mutate, deleteData } = useApi(quizUrl, {
    fetch: true,
  });
 
  console.log("list quiz",quizzes);


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  // Refresh list whenever the route changes
  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!selectedQuiz) return;
    try {
      await deleteData(`${selectedQuiz.id}/`);
      toast.success('Quiz deleted successfully!');
      mutate();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete quiz.');
    } finally {
      setConfirmOpen(false);
      setSelectedQuiz(null);
    }
  };

  const openDeleteDialog = (quiz) => {
    setSelectedQuiz(quiz);
    setConfirmOpen(true);
  };

  // Add new quiz
  const handleAddNew = () => {
    if (onCreate) return onCreate();
    router.push(`/${locale}/dashboard/quizzes/`);
  };

  // Edit quiz
  const handleEdit = (quiz) => {
    if (onEdit) return onEdit(quiz);
    router.push(`/${locale}/dashboard/quizzes/edit/${quiz.id}`);
  };

  // Expand/collapse instructions
  const toggleExpand = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  if (isLoading) return <Loading />;

  if (error)
    return <Box sx={{ p: 3, textAlign: 'center' }}>⚠️ Failed to load quizzes. Please refresh.</Box>;

  if (!quizzes?.length)
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No quizzes found.</Typography>
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{ mt: 2, borderRadius: 2 }}
          startIcon={<Icon icon="mdi:plus" />}
        >
          Add New Quiz
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: { lg: 10, md: 5, xs: 3 } }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Quiz List
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon="mdi:plus" />}
          onClick={handleAddNew}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 2.5 }}
        >
          Add New Quiz
        </Button>
      </Stack>

      {/* Quiz Cards */}
      <Stack spacing={2}>
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              transition: '0.2s ease',
              '&:hover': { boxShadow: '0 4px 14px rgba(0,0,0,0.15)', transform: 'translateY(-2px)' },
            }}
          >
            {/* Quiz Info */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography fontWeight={600} variant="subtitle1">
                  {quiz.title || 'Untitled Quiz'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Timer: {quiz.timer_duration} min | Instructions: {quiz.total_instruction_pages || quiz.instructions?.length || 0}
                </Typography>
              </Box>

              {/* Actions */}
              <Stack direction="row" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(quiz)}
                  sx={{ bgcolor: 'rgba(25,118,210,0.08)', '&:hover': { bgcolor: 'rgba(25,118,210,0.15)' } }}
                >
                  <Icon icon="mdi:pencil" width={20} />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => openDeleteDialog(quiz)}
                  sx={{ bgcolor: 'rgba(211,47,47,0.08)', '&:hover': { bgcolor: 'rgba(211,47,47,0.15)' } }}
                >
                  <Icon icon="mdi:delete" width={20} />
                </IconButton>

                <IconButton
                  onClick={() => toggleExpand(quiz.id)}
                  sx={{ bgcolor: 'rgba(0,167,111,0.08)', '&:hover': { bgcolor: 'rgba(0,200,127,0.15)' } }}
                >
                  <Icon icon={expandedQuiz === quiz.id ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={20} />
                </IconButton>
              </Stack>
            </Stack>

            {/* Instructions Collapse */}
            <Collapse in={expandedQuiz === quiz.id} timeout="auto" unmountOnExit>
              <Divider sx={{ my: 2 }} />
              {quiz.instructions?.length ? (
                <Stack spacing={2}>
                  {quiz.instructions.map((inst, idx) => (
                    <Box key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: '#FAFAFA', border: '1px solid #E0E0E0' }}>
                      <Typography fontWeight={600}>Page {inst.page}</Typography>
                      <Typography fontWeight={500}>{inst.title_en}</Typography>
                      <Box
                        dangerouslySetInnerHTML={{ __html: inst.content }}
                        sx={{ mt: 1, fontSize: '0.9rem', color: '#333' }}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  No instructions available
                </Typography>
              )}
            </Collapse>
          </Card>
        ))}
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Quiz?"
        content={`Are you sure you want to delete "${selectedQuiz?.title}"? This action cannot be undone.`}
        onClose={() => setConfirmOpen(false)}
        action={
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        }
      />
    </Box>
  );
}

// ------------------------------------------------------------

QuizList.propTypes = {
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
};
