'use client';

import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';

// Styled hidden input (not used here, but kept for consistency)
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

const QUESTIONS_API = 'http://192.168.88.82:8090/api/questions/';
const QUIZZES_API = '/api/quizzes/'; // Adjust if needed

export default function QuestionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizIdFromUrl = searchParams.get('quiz');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch quizzes for dropdown
  const {
    data: quizzes,
    isLoading: quizzesLoading,
    error: quizzesError,
  } = useApi(QUIZZES_API, { fetch: true });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quiz: quizIdFromUrl || '',
      questions: [
        {
          question: '',
          qus_time: 30,
          options: ['', '', '', ''],
          correct_answer: '',
          explain: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedQuiz = watch('quiz');
  const watchedQuestions = watch('questions');

  // Pre-fill quiz from URL
  useEffect(() => {
    if (quizIdFromUrl && quizzes) {
      setValue('quiz', quizIdFromUrl);
    }
  }, [quizIdFromUrl, quizzes, setValue]);

  const handleAddQuestion = () => {
    append({
      question: '',
      qus_time: 30,
      options: ['', '', '', ''],
      correct_answer: '',
      explain: '',
    });
  };

  const handleRemoveQuestion = (index) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.warning('At least one question is required.');
    }
  };

    const onSubmit = async (data) => {
      console.log('data check', data);
    if (!data.quiz) {
      toast.error('Please select a quiz.');
      return;
    }

    const payload = data.questions.map((q) => ({
      quiz: Number(data.quiz),
      question: q.question,
      qus_time: Number(q.qus_time),
      options: q.options.filter((opt) => opt.trim() !== ''),
      correct_answer: q.correct_answer,
      explain: q.explain,
    }));

    // Validate correct_answer is in options
    const invalid = payload.some((q) => !q.options.includes(q.correct_answer));
    if (invalid) {
      toast.error('Correct answer must be one of the options.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(QUESTIONS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save questions');
      }

      toast.success('Questions created successfully!');
      router.push('/en/dashboard/quizlist');
    } catch (err) {
      toast.error(`Failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => router.push('/en/dashboard/quizlist');

  if (quizzesLoading) return <Loading />;
  if (quizzesError)
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load quizzes</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        px: 2,
        background: 'linear-gradient(135deg, #F9FAFB, #E5E7EB)',
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Paper sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: 3 }}>
          <Box sx={{ height: 4, background: '#00A76F' }} />
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
            <Stack spacing={4}>
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                  Add Questions to Quiz
                </Typography>
                <IconButton onClick={handleCancel} size="small">
                  <Icon icon="mdi:close" />
                </IconButton>
              </Stack>

              {/* Quiz Selector */}
              <Controller
                name="quiz"
                control={control}
                rules={{ required: 'Please select a quiz' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.quiz}>
                    <InputLabel>Select Quiz</InputLabel>
                    <Select {...field} label="Select Quiz">
                      <MenuItem value="" disabled>
                        Choose a quiz
                      </MenuItem>
                      {quizzes?.map((q) => (
                        <MenuItem key={q.id} value={q.id}>
                          {q.title} (ID: {q.id})
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.quiz && <FormHelperText>{errors.quiz.message}</FormHelperText>}
                  </FormControl>
                )}
              />

              {/* Questions List */}
              <Box>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Questions ({fields.length})
                </Typography>

                {fields.map((item, qIdx) => {
                  const options = watchedQuestions[qIdx]?.options || [];

                  return (
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography fontWeight={600}>Question {qIdx + 1}</Typography>
                        {fields.length > 1 && (
                          <IconButton
                            onClick={() => handleRemoveQuestion(qIdx)}
                            sx={{ color: 'red' }}
                          >
                            <Icon icon="mdi:delete" />
                          </IconButton>
                        )}
                      </Stack>

                      {/* Question Text */}
                      <Controller
                        name={`questions.${qIdx}.question`}
                        control={control}
                        rules={{ required: 'Question is required' }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Question"
                            multiline
                            rows={2}
                            {...field}
                            error={!!errors.questions?.[qIdx]?.question}
                            helperText={errors.questions?.[qIdx]?.question?.message}
                          />
                        )}
                      />

                      {/* Question Time */}
                      <Controller
                        name={`questions.${qIdx}.qus_time`}
                        control={control}
                        rules={{
                          required: 'Time is required',
                          min: { value: 5, message: 'Min 5 seconds' },
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Time (seconds)"
                            type="number"
                            sx={{ mt: 2 }}
                            inputProps={{ min: 5 }}
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number(e.target.value) : '')
                            }
                            error={!!errors.questions?.[qIdx]?.qus_time}
                            helperText={errors.questions?.[qIdx]?.qus_time?.message}
                          />
                        )}
                      />

                      {/* Options */}
                      <Typography variant="subtitle2" fontWeight={500} mt={2} mb={1}>
                        Options (4 recommended)
                      </Typography>
                      {options.map((_, optIdx) => (
                        <Controller
                          key={optIdx}
                          name={`questions.${qIdx}.options.${optIdx}`}
                          control={control}
                          rules={{
                            required: optIdx < 2 ? 'Option is required' : false,
                          }}
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              label={`Option ${optIdx + 1}`}
                              {...field}
                              sx={{ mb: 1 }}
                              error={!!errors.questions?.[qIdx]?.options?.[optIdx]}
                              helperText={errors.questions?.[qIdx]?.options?.[optIdx]?.message}
                            />
                          )}
                        />
                      ))}

                      {/* Correct Answer */}
                      <Controller
                        name={`questions.${qIdx}.correct_answer`}
                        control={control}
                        rules={{
                          required: 'Correct answer is required',
                          validate: (val) =>
                            options.includes(val) || 'Must select one of the options',
                        }}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!errors.questions?.[qIdx]?.correct_answer}
                          >
                            <InputLabel>Correct Answer</InputLabel>
                            <Select {...field} label="Correct Answer">
                              <MenuItem value="" disabled>
                                Select correct option
                              </MenuItem>
                              {options
                                .filter((opt) => opt.trim() !== '')
                                .map((opt, i) => (
                                  <MenuItem key={i} value={opt}>
                                    {opt}
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                              {errors.questions?.[qIdx]?.correct_answer?.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      />

                      {/* Explain (CKEditor) */}
                      <Box mt={2}>
                        <Typography variant="subtitle2" fontWeight={500} mb={1}>
                          Explanation
                        </Typography>
                        <Controller
                          name={`questions.${qIdx}.explain`}
                          control={control}
                          rules={{ required: 'Explanation is required' }}
                          render={({ field: { onChange, value } }) => (
                            <CKEditor
                              editor={ClassicEditor}
                              data={value || ''}
                              onChange={(_, editor) => onChange(editor.getData())}
                              config={{
                                toolbar: [
                                  'bold',
                                  'italic',
                                  'link',
                                  '|',
                                  'bulletedList',
                                  'numberedList',
                                ],
                              }}
                            />
                          )}
                        />
                        {errors.questions?.[qIdx]?.explain && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 1, display: 'block' }}
                          >
                            {errors.questions[qIdx].explain.message}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  );
                })}

                <Button
                  variant="outlined"
                  onClick={handleAddQuestion}
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
                  Add Another Question
                </Button>
              </Box>

              {/* Submit Buttons */}
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" fullWidth onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting || !watchedQuiz}
                  sx={{
                    background: 'linear-gradient(90deg, #00A76F, #00C87F)',
                    '&:hover': { background: 'linear-gradient(90deg, #00A76F, #00C87F)' },
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" width={20} height={20} sx={{ mr: 1 }} />
                      Save All Questions
                    </>
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
