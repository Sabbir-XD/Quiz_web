'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { useEndpoints } from 'src/utils/useEndpoints';
import useApi from 'src/api/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

export default function HeroManagement({ Banners = null }) {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title_english: '',
      subtitle_english: '',
      button_english: '',
      page: '',
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { banners: bannerUrl } = useEndpoints();
  const { postData, patchData, putData } = useApi(bannerUrl, { fetch: false });
  const router = useRouter();

  // ✅ Populate form if editing an existing banner
  useEffect(() => {
    if (banner) {
      reset({
        title_english: banner.title_english || '',
        subtitle_english: banner.subtitle_english || '',
        button_english: banner.button_english || '',
        page: banner.page || '',
      });
      setImagePreview(banner.image || null);
    }
  }, [banner, reset]);

  const onSubmit = async (data) => {
    if (!imageFile && !imagePreview) {
      setError('image', { type: 'required', message: 'Image is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title_english', data.title_english);
      formDataToSend.append('subtitle_english', data.subtitle_english);
      formDataToSend.append('button_english', data.button_english);
      formDataToSend.append('page', data.page || '');
      if (imageFile) formDataToSend.append('image', imageFile);

      // ✅ Decide between POST or PATCH
      if (banner) {
        await patchData(`/${banner.id}`, formDataToSend);
        toast.success('Banner updated successfully!');
      } else {
        await putData('', formDataToSend);
        toast.success('Banner created successfully!');
      }

      // Refresh UI or redirect
      router.push('/en/dashboard/home');
    } catch (err) {
      console.error('Error saving hero:', err);
      toast.error('Failed to save hero section.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      clearErrors('image');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

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
              <Typography variant="h6" fontWeight={700}>
                {banner ? 'Edit Hero Banner' : 'Create New Hero Banner'}
              </Typography>

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

              {/* Button Text & Page */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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

                <Controller
                  name="page"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Page URL"
                      {...field}
                      error={!!errors.page}
                      helperText={errors.page?.message}
                    />
                  )}
                />
              </Stack>

              {/* Image Upload */}
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Hero Image
                </Typography>

                {!imagePreview ? (
                  <label style={{ cursor: 'pointer' }}>
                    <Box
                      sx={{
                        border: '2px dashed #00A76F',
                        borderRadius: 3,
                        py: 6,
                        textAlign: 'center',
                        transition: '0.2s',
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
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  background: 'linear-gradient(90deg, #00A76F, #00C87F)',
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: 16,
                  '&:hover': { background: 'linear-gradient(90deg, #00A76F, #00C87F)' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <Icon icon="mdi:send" width={20} height={20} />
                )}
                {isSubmitting ? 'Saving...' : banner ? 'Update Hero Section' : 'Save Hero Section'}
              </Button>
            </Stack>
          </Box>
        </Paper>

        <Typography color="text.secondary" mt={2} textAlign="center" variant="caption">
          Changes will be reflected on your website immediately after saving
        </Typography>
      </Box>
    </Box>
  );
}
