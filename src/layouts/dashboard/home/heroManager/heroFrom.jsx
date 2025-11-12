'use client';

import { toast } from 'sonner';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';

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

HeroForm.propTypes = {
  editId: PropTypes.string,
};

export default function HeroForm({ editId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { banners: bannerUrl, get_quizzes: quizzesData } = useEndpoints();

  const editBannerId = editId || searchParams.get('edit');

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quiz_id: '',
      title_english: '',
      subtitle_english: '',
      button_english: '',
      image: null,
    },
  });

  // Fetch existing banner data if editing
  const fetchUrl = editBannerId ? `${bannerUrl.replace(/\/$/, '')}/${editBannerId}` : null;

  // Fetch banner data for editing
  const {
    data: bannerData,
    error: fetchError,
    isLoading: isFetching,
  } = useApi(fetchUrl, { fetch: !!editBannerId });

  // API hooks for creating and updating banners
  const { postData, putData } = useApi(bannerUrl, { fetch: false });

  // Fetch quizzes for the select dropdown
  const { data: quizData, mutate } = useApi(quizzesData, { fetch: true });

  // Update quiz list when quiz data changes
  useEffect(() => {
    if (quizData) setQuizList(quizData);
    setLoadingQuiz(!quizData);
    mutate();
  }, [quizData, mutate]);

  // Populate form when banner data is loaded
  useEffect(() => {
    if (bannerData && editBannerId && quizList.length > 0) {
      // bannerData may provide quiz either as `quiz` object or `quiz_id` field.
      // Normalize to string because Select option values are strings below.
      const quizIdFromData = bannerData.quiz?.id ?? bannerData.quiz_id ?? '';

      reset({
        quiz_id: quizIdFromData ? String(quizIdFromData) : '',
        title_english: bannerData.title_english || '',
        subtitle_english: bannerData.subtitle_english || '',
        button_english: bannerData.button_english || '',
      });
      if (bannerData.image) setImagePreview(bannerData.image);
    }
  }, [bannerData, editBannerId, reset, quizList]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should not exceed 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue('image', null);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    // Validate image presence for new banners
    if (!editBannerId && !imageFile && !imagePreview) {
      setError('image', { message: 'Image is required' });
      toast.error('Please upload an image');
      return;
    }

    setIsSubmitting(true);

    // Submit form data
    try {
      const formData = new FormData();
      const payload = {
        quiz_id: Number(data.quiz_id),
        title_english: data.title_english,
        subtitle_english: data.subtitle_english,
        button_english: data.button_english,
      };

      // Append payload data to formData
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key].toString());
      });

      // Append image file if selected
      if (imageFile) formData.append('image', imageFile);

      // Call appropriate API method
      if (editBannerId) {
        // Update existing banner
        await putData(editBannerId, formData);
        toast.success('Banner updated successfully!');
      } else {
        // Create new banner
        await postData(formData);
        toast.success('Banner created successfully!');
      }

      // Redirect to banner list after success
      router.push('/en/dashboard/home/herolist');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Operation failed';
      toast.error(
        editBannerId ? `Failed to update: ${errorMessage}` : `Failed to create: ${errorMessage}`
      );
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => router.push('/en/dashboard/home/herolist');
  // Render loading or error states
  if (isFetching) return <Loading />;

  // Render error state
  if (fetchError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load banner data</Typography>
        <Button onClick={handleCancel} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // Render main form
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
                  {editBannerId ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                </Typography>
                <IconButton onClick={handleCancel} size="small">
                  <Icon icon="mdi:close" />
                </IconButton>
              </Stack>

              {/* Quiz Select */}
              <Controller
                name="quiz_id"
                control={control}
                rules={{ required: 'Quiz selection is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.quiz_id}>
                    <InputLabel>Quiz</InputLabel>
                    <Select {...field} label="Quiz" disabled={loadingQuiz}>
                      {loadingQuiz ? (
                        <MenuItem disabled>Loading quizzes...</MenuItem>
                      ) : (
                        quizList.map((quiz) => (
                          <MenuItem key={quiz.id} value={String(quiz.id)}>
                            {quiz?.title}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    {errors.quiz_id && (
                      <Typography variant="caption" color="error">
                        {errors.quiz_id.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Title */}
              <Controller
                name="title_english"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Title (English)"
                    {...field}
                    error={!!errors.title_english}
                    helperText={errors.title_english?.message}
                  />
                )}
              />

              {/* Subtitle */}
              <Controller
                name="subtitle_english"
                control={control}
                rules={{ required: 'Subtitle is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Subtitle (English)"
                    multiline
                    rows={3}
                    {...field}
                    error={!!errors.subtitle_english}
                    helperText={errors.subtitle_english?.message}
                  />
                )}
              />

              {/* Button Text */}
              <Controller
                name="button_english"
                control={control}
                rules={{ required: 'Button text is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Button Text"
                    {...field}
                    error={!!errors.button_english}
                    helperText={errors.button_english?.message}
                  />
                )}
              />

              {/* Image Upload */}
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Hero Image {!editBannerId && <span style={{ color: 'red' }}>*</span>}
                </Typography>

                {!imagePreview ? (
                  <>
                    <Box
                      component="label"
                      htmlFor="hero-image-upload"
                      sx={{
                        display: 'block',
                        cursor: 'pointer',
                        border: '2px dashed #00A76F',
                        borderRadius: 3,
                        py: 6,
                        textAlign: 'center',
                        '&:hover': { bgcolor: '#F0FFF4' },
                      }}
                    >
                      <Icon icon="mdi:upload" color="#00A76F" width={32} height={32} />
                      <Typography mt={1}>Click to upload image</Typography>
                      <Typography variant="caption" color="text.secondary">
                        PNG, JPG or WEBP (max. 5MB)
                      </Typography>
                    </Box>
                    <VisuallyHiddenInput
                      id="hero-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'red',
                        color: 'white',
                        '&:hover': { bgcolor: '#b91c1c' },
                      }}
                    >
                      <Icon icon="mdi:close" width={20} height={20} />
                    </IconButton>
                  </Box>
                )}
                {errors.image && (
                  <Typography variant="caption" color="error">
                    {errors.image.message}
                  </Typography>
                )}
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
                    : editBannerId
                      ? 'Update Hero Section'
                      : 'Save Hero Section'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
