'use client';

import { toast } from 'sonner';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Card, Stack, Button, CardMedia, Typography, IconButton } from '@mui/material';

import { useEndpoints } from 'src/utils/useEndpoints';

import useApi from 'src/api/api';
import Loading from 'src/app/loading';
import { ConfirmDialog } from 'src/layouts/components/sooner/ConfirmDialog';

// ------------------------------------------------------------

export default function HeroList({ onCreate, onEdit }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { banners: bannerUrl } = useEndpoints();

  const {
    data: banners,
    error,
    isLoading,
    mutate,
    deleteData,
  } = useApi(bannerUrl, {
    fetch: true,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  // Refresh list whenever the route changes
  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!selectedBanner) return;
    try {
      await deleteData(`${selectedBanner.id}/`);
      toast.success('Banner deleted successfully!');
      mutate(); // Refresh list after deletion
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete banner.');
    } finally {
      setConfirmOpen(false);
      setSelectedBanner(null);
    }
  };

  // Open Delete Confirmation Dialog
  const openDeleteDialog = (banner) => {
    setSelectedBanner(banner);
    setConfirmOpen(true);
  };

  // Add New Banner
  const handleAddNew = () => {
    if (onCreate) {
      onCreate();
      return;
    }
    router.push(`/${locale}/dashboard/home`);
  };

  // Edit Banner
  const handleEdit = (banner) => {
    const editId = String(banner.id);
    // if (onEdit) return onEdit(banner.id);
    return router.push(`/${locale}/dashboard/home/edit/${editId}`);
  };

  // Loading / Error / Empty States
  if (isLoading) return <Loading />;

  if (error)
    return <Box sx={{ p: 3, textAlign: 'center' }}>⚠️ Failed to load banners. Please refresh.</Box>;

  if (!banners?.length)
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">No banners found.</Typography>
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{ mt: 2, borderRadius: 2 }}
          startIcon={<Icon icon="mdi:plus" />}
        >
          Add New Banner
        </Button>
      </Box>
    );

  // Main UI
  return (
    <Box
      sx={{
        p: {
          lg: 10,
          md: 5,
          xs: 3,
        },
      }}
    >
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

      {/* Banner List */}
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
              image={banner.image || '/placeholder-image.jpg'}
              alt={banner.title_english || 'Banner image'}
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
                {banner.subtitle_english || 'No subtitle available'}
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
                onClick={() => openDeleteDialog(banner)}
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

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Banner?"
        content={`Are you sure you want to delete "${selectedBanner?.title_english}"? This action cannot be undone.`}
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

HeroList.propTypes = {
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
};
