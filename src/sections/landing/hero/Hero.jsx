'use client';

// no React hooks required here
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';
import { useEndpoints } from 'src/utils/useEndpoints';
import useApi from 'src/api/api';
import Loading from 'src/app/loading';

// endpoints/api/loading not used in this static sample

export default function HeroSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  const pathname = usePathname();
  const router = useRouter();

  const { banners: bannerUrl } = useEndpoints();

  const { data: banners, error, isLoading, mutate } = useApi(bannerUrl, { fetch: true });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !banners) {
    return (
      <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No banners available
      </Box>
    );
  }

  // compute page URLs dynamically from each banner's quiz id
  const bannersWithPages = banners.map((b) => ({
    ...b,
    page: b?.quiz?.id ? `${pathname}/instructions/${b.quiz.id}` : null,
  }));

  const handleButtonClick = (pageUrl) => {
    // navigate to the computed page URL
    if (!pageUrl) return;
    router.push(pageUrl);
  };

  return (
    <Box
      ref={emblaRef}
      sx={{
        overflow: 'hidden',
        width: '100%',
        height: { xs: '70vh', md: '70vh' },
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {bannersWithPages?.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              flex: '0 0 100%',
              height: '100%',
              position: 'relative',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                px: 2,
              }}
            >
              {/* Title */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {pathname.startsWith('/en') ? slide.title_english : slide.title_bangla}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="subtitle1"
                sx={{
                  maxWidth: '600px',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {pathname.startsWith('/en') ? slide.subtitle_english : slide.subtitle_bangla}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleButtonClick(slide.page)}
                sx={{
                  borderRadius: '30px',
                  px: 4,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  backgroundColor: '#22C55E',
                  '&:hover': {
                    backgroundColor: '#118D57',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {pathname.startsWith('/en') ? slide.button_english : slide.button_bangla}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
