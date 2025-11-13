'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';
import { useEndpoints } from 'src/utils/useEndpoints';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

QuizForm.propTypes = {
  editId: PropTypes.string,
};

export default function QuizForm({ editId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { get_quizzes: quizUrl } = useEndpoints();

  const editQuizId = editId || searchParams.get('edit');

  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('data dekha chalu',isSubmitting)

  const { postData, putData } = useApi(quizUrl, { fetch: false });

  const { data: quizData, error, isLoading } = useApi(
    editQuizId ? `${quizUrl.replace(/\/$/, '')}/${editQuizId}` : null,
    { fetch: !!editQuizId }
  );

  console.log('amr data' ,quizData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      timer_duration: '',
      instructions: [{ page: 1, title_en: '', content: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  // Prefill edit data
  useEffect(() => {
    if (quizData && editQuizId) {
      const formattedInstructions =
        quizData.instructions?.map((inst, idx) => ({
          page: idx + 1,
          title_en: inst.title_en || '',
          content: inst.content || '',
        })) || [{ page: 1, title_en: '', content: '' }];

      reset({
        title: quizData.title || '',
        description: quizData.description || '',
        timer_duration: quizData.timer_duration || '',
        instructions: formattedInstructions,
      });
    }
  }, [quizData, editQuizId, reset]);

  const handleAddInstruction = () => {
    append({ page: fields.length + 1, title_en: '', content: '' });
  };
  
  const handleRemoveInstruction = (index) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.warning('At least one instruction page is required.');
    }
  };

  const onSubmit = async (data) => {
    console.log("data gula dekha", data);
    try {
      setIsSubmitting(true);

      const payload = {
        title: data.title,
        description: data.description,
        timer_duration: Number(data.timer_duration),
        total_instruction_pages: data.instructions.length,
        instructions: data.instructions.map((inst, index) => ({
          page: index + 1,
          title_en: inst.title_en,
          content: inst.content,
        })),
      };
  console.log("data payload", payload);
      if (editQuizId) {
        await putData(editQuizId, payload);
        toast.success('Quiz updated successfully!');
      } else {
        await postData(payload);
        toast.success('Quiz created successfully!');
      }

      router.push('/en/dashboard/quizlist');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      toast.error(`Failed to save quiz: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => router.push('/en/dashboard/quizlist');

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load quiz data</Typography>
        <Button onClick={handleCancel} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        px: 2,
        background: 'linear-gradient(135deg, #F9FAFB, #E5E7EB)',
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        <Paper sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: 3 }}>
          <Box sx={{ height: 4, background: '#00A76F' }} />
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  {editQuizId ? 'Edit Quiz' : 'Create New Quiz'}
                </Typography>
                <IconButton onClick={handleCancel} size="small">
                  <Icon icon="mdi:close" />
                </IconButton>
              </Stack>

              {/* Title */}
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Quiz Title"
                    {...field}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Quiz Description"
                    multiline
                    rows={3}
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />

              {/* Timer Duration */}
              <Controller
                name="timer_duration"
                control={control}
                rules={{
                  required: 'Timer duration is required',
                  min: { value: 1, message: 'Must be at least 1 minute' },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Timer Duration (Second)"
                    type="number"
                    {...field}
                    error={!!errors.timer_duration}
                    helperText={errors.timer_duration?.message}
                  />
                )}
              />

              {/* Instructions Section */}
              <Box>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Quiz Instructions
                </Typography>

                {fields.map((item, index) => (
                  <Paper
                    key={item.id}
                    sx={{
                      p: 3,
                      mb: 3,
                      border: '1px solid #E0E0E0',
                      borderRadius: 3,
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography fontWeight={600}>Instruction Page {item.page}</Typography>
                      {fields.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveInstruction(index)}
                          sx={{ color: 'red' }}
                        >
                          <Icon icon="mdi:delete" />
                        </IconButton>
                      )}
                    </Stack>

                    {/* Title EN */}
                    <Controller
                      name={`instructions.${index}.title_en`}
                      control={control}
                      rules={{ required: 'Title is required' }}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          label="Instruction Title (English)"
                          {...field}
                          error={!!errors.instructions?.[index]?.title_en}
                          helperText={errors.instructions?.[index]?.title_en?.message}
                        />
                      )}
                    />

                    {/* Content (CKEditor) */}
                    <Box mt={2}>
                      <Typography variant="subtitle2" fontWeight={500} mb={1}>
                        Content
                      </Typography>
                      <Controller
                        name={`instructions.${index}.content`}
                        control={control}
                        rules={{ required: 'Content is required' }}
                        render={({ field: { onChange, value } }) => (
                          <CKEditor
                            editor={ClassicEditor}
                            data={value || ''}
                            onChange={(_, editor) => onChange(editor.getData())}
                          />
                        )}
                      />
                      {errors.instructions?.[index]?.content && (
                        <Typography variant="caption" color="error">
                          {errors.instructions[index].content.message}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                ))}

                <Button
                  variant="outlined"
                  onClick={handleAddInstruction}
                  startIcon={<Icon icon="mdi:plus" />}
                  sx={{
                    borderColor: '#00A76F',
                    color: '#00A76F',
                    '&:hover': {
                      borderColor: '#00C87F',
                      backgroundColor: '#F0FFF4',
                    },
                  }}
                >
                  Add Instruction Page
                </Button>
              </Box>

              {/* Buttons */}
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" fullWidth onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    background: 'linear-gradient(90deg, #00A76F, #00C87F)',
                    '&:hover': { background: 'linear-gradient(90deg, #00A76F, #00C87F)' },
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    <Icon icon="mdi:send" width={20} height={20} />
                  )}
                  &nbsp;
                  {isSubmitting
                    ? 'Saving...'
                    : editQuizId
                      ? 'Update Quiz'
                      : 'Save Quiz'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
