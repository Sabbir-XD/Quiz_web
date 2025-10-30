'use client';

import { useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter, usePathname } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';

export default function HeroSlider({ params }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);

  const slides = useMemo(() => [
    {
      id: 1,
      title_english: "Fun Learning for Curious Minds",
      subtitle_english: "Interactive quizzes that make education exciting and engaging for children of all ages.",
      button_english: "Start Fun Learning",
      title_bangla: "কৌতূহলী মনের জন্য মজার শিক্ষা",
      subtitle_bangla: "ইন্টারেক্টিভ কুইজ যা সব বয়সের শিশুদের জন্য শিক্ষাকে উত্তেজনাপূর্ণ এবং আকর্ষক করে তোলে।",
      button_bangla: "মজা শেখা শুরু করুন",
      page: `${pathname}/instructions`,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600",
      is_active: true,
    },
    {
      id: 2,
      title_english: "Learn Through Play & Quizzes",
      subtitle_english: "Colorful, animated quizzes that teach important concepts while keeping children entertained.",
      button_english: "Explore Kids Zone",
      title_bangla: "প্লে এবং কুইজের মাধ্যমে শিখুন",
      subtitle_bangla: "রঙিন, অ্যানিমেটেড কুইজ যা শিশুদের বিনোদনের জন্য গুরুত্বপূর্ণ ধারণা শেখায়।",
      button_bangla: "কিডস জোন এক্সপ্লোর করুন",
      page: `${pathname}/instructions`,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600",
      is_active: true,
    },
    {
      id: 3,
      title_english: "Build Strong Foundation",
      subtitle_english: "Age-appropriate quizzes designed by educators to develop critical thinking and knowledge.",
      button_english: "View Courses",
      title_bangla: "শক্তিশালী ভিত্তি গড়ে তুলুন",
      subtitle_bangla: "সমালোচনামূলক চিন্তাভাবনা এবং জ্ঞান বিকাশের জন্য শিক্ষাবিদদের দ্বারা ডিজাইন করা বয়স-উপযুক্ত কুইজ।",
      button_bangla: "কোর্স দেখুন",
      page: `${pathname}/instructions`,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600",
      is_active: true,
    },
    {
      id: 4,
      title_english: "Grow Smarter, Have Fun!",
      subtitle_english: "Join thousands of children who are learning important skills while having fun.",
      button_english: "Join Fun Learning",
      title_bangla: "স্মার্ট হয়ে উঠুন, মজা করুন!",
      subtitle_bangla: "হাজার হাজার শিশুর সাথে যোগ দিন যারা মজা করার সময় গুরুত্বপূর্ণ দক্ষতা শিখছে।",
      button_bangla: "মজা শেখার যোগদান",
      page: `${pathname}/instructions`,
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1600",
      is_active: true,
    },
  ], [pathname]);

  const handleButtonClick = (pageUrl) => {
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
        {slides.map((slide) => (
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
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {pathname === "/en/" ? slide.title_english : slide.title_bangla}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  maxWidth: '600px',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {pathname === "/en/" ? slide.subtitle_english : slide.subtitle_bangla}
              </Typography>

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
                {pathname === "/en/" ? slide.button_english : slide.button_bangla}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
