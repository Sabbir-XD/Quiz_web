'use client';

import { toast } from 'sonner';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Card, Stack, Button, CardMedia, Typography, IconButton } from '@mui/material';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';

export default function HeroList({ onCreate, onEdit }) {
  const { banners: bannerUrl } = useEndpoints();
  const { deleteData } = useApi(bannerUrl);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const router = useRouter();

  const { data: banners, error, isLoading, mutate } = useApi(bannerUrl, { fetch: true });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  const handleDelete = async (id) => {
    // use `window.confirm` to avoid ESLint "no-restricted-globals" and be explicit
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      await deleteData(`/${id}`);
      toast.success('Banner deleted successfully!');
      mutate();
    } catch (err) {
      toast.error('Failed to delete banner.');
    }
  };

  const handleAddNew = () => {
    router.push(`/${locale}/dashboard/home`);
    onCreate?.();
  };

  const handleEdit = (banner) => {
    // Ensure the ID is properly converted to string
    const editId = String(banner.id);
    // Navigate to home page with the banner data in the URL
    router.push(`/${locale}/dashboard/home?edit=${editId}`);
    console.log('Editing banner:', banner); // Debug log
  };

  if (isLoading) return <Loading />;
  if (error) return <Box sx={{ p: 3 }}>⚠️ Failed to load banners.</Box>;
  if (!banners?.length) return <Box sx={{ p: 3 }}>No banners found.</Box>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Hero Banners
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon="mdi:plus" />}
          onClick={handleAddNew}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
          }}
        >
          Add New
        </Button>
      </Stack>

      {/* List */}
      <Stack spacing={2}>
        {banners.map((banner) => (
          <Card
            key={banner.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              transition: '0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Banner Image */}
            <CardMedia
              component="img"
              image={banner.image}
              alt={banner.title_english}
              sx={{
                width: 140,
                height: 90,
                objectFit: 'cover',
                borderRadius: 2,
                mr: 2,
              }}
            />

            {/* Banner Info */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight={600} variant="subtitle1">
                {banner.title_english || 'Untitled'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {banner.subtitle_english || 'No subtitle'}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => handleEdit(banner)}
                sx={{
                  bgcolor: 'rgba(25,118,210,0.08)',
                  '&:hover': { bgcolor: 'rgba(25,118,210,0.15)' },
                }}
              >
                <Icon icon="mdi:pencil" width={20} />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => handleDelete(banner.id)}
                sx={{
                  bgcolor: 'rgba(211,47,47,0.08)',
                  '&:hover': { bgcolor: 'rgba(211,47,47,0.15)' },
                }}
              >
                <Icon icon="mdi:delete" width={20} />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
