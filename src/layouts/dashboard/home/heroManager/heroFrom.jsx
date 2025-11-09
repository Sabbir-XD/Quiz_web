'use client';

import { toast } from 'sonner';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Stack,
  Button,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
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
  const { banners: bannerUrl } = useEndpoints();

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

  const fetchUrl = editBannerId ? `${bannerUrl.replace(/\/$/, '')}/${editBannerId}` : null;

  const {
    data: bannerData,
    error: fetchError,
    isLoading: isFetching,
  } = useApi(fetchUrl, {
    fetch: !!editBannerId,
  });

  const { postData, putData } = useApi(bannerUrl, { fetch: false });

  // Fetch quiz list for dropdown
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('http://192.168.88.227:8090/api/get_quiz/');
        const data = await res.json();
        setQuizList(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quiz list');
      } finally {
        setLoadingQuiz(false);
      }
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (bannerData && editBannerId) {
      reset({
        quiz_id: bannerData.quiz?.id || '',
        title_english: bannerData.title_english || '',
        subtitle_english: bannerData.subtitle_english || '',
        button_english: bannerData.button_english || '',
      });

      if (bannerData.image) {
        setImagePreview(bannerData.image);
      }
    }
  }, [bannerData, editBannerId, reset]);

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
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue('image', null);
  };

  const onSubmit = async (data) => {
    if (!editBannerId && !imageFile && !imagePreview) {
      setError('image', { message: 'Image is required' });
      toast.error('Please upload an image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData
      const formData = new FormData();

      const payload = {
        quiz_id: Number(data.quiz_id),
        title_english: data.title_english,
        subtitle_english: data.subtitle_english,
        button_english: data.button_english,
      };

      // Add all regular fields
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key].toString());
      });

      // Handle image upload
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Log for debugging
      console.log('Payload:', payload);
      console.log('Image:', imageFile ? 'File uploaded' : 'No file');
      console.log('Banner URL:', bannerUrl);
      console.log('Edit ID:', editBannerId);

      let response;
      if (editBannerId) {
        
        response = await putData(editBannerId, formData);
        toast.success('Banner updated successfully!');
      } else {
        
        response = await postData(formData);
        toast.success('Banner created successfully!');
      }

      console.log('Response:', response);
      router.push('/en/dashboard/home/herolist');
    } catch (err) {
      console.error('Submit error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);

      const errorMessage = err.response?.data?.message || err.message || 'Operation failed';
      toast.error(
        editBannerId ? `Failed to update: ${errorMessage}` : `Failed to create: ${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = () => {
    router.push('/en/dashboard/home/herolist');
  };

  if (isFetching) return <Loading />;

  if (fetchError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error"> Failed to load banner data</Typography>
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
                  {editBannerId ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                </Typography>
                <IconButton onClick={handleCancel} size="small">
                  <Icon icon="mdi:close" />
                </IconButton>
              </Stack>

              {/* Quiz Select Field */}
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
                          <MenuItem key={quiz.id} value={quiz.id}>
                            {quiz.title}
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
