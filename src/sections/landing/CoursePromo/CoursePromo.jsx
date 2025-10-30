'use client';

import React from 'react';
import { m } from 'framer-motion';

import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Card, Grid, Chip, Button, Typography, CardContent } from '@mui/material';

export default function CoursePromo() {
  const courses = [
    {
      title: 'Full Stack Web Development',
      mode: 'Online',
      icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      desc: 'Learn MERN stack and build real-world web apps with hands-on projects.',
    },
    {
      title: 'Graphic Design Masterclass',
      mode: 'Offline',
      icon: <BrushIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      desc: 'Become a creative designer using Figma, Photoshop, and Illustrator.',
    },
    {
      title: 'Digital Marketing Essentials',
      mode: 'Online',
      icon: <LanguageIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      desc: 'Master SEO, social media, and ads to grow your personal brand.',
    },
  ];

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        background: `linear-gradient(135deg, ${'#5BE49B'}, ${'#C684FF'})`,
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ color: 'gray.700', mb: 4 }}
      >
        Explore Our Most Popular Courses
      </Typography>

      {/* Course Cards */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        component={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              component={m.div}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 6,
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)',
                p: 3,
              }}
            >
              <CardContent>
                {course.icon}

                <Typography variant="h6" fontWeight="bold">
                  {course.title}
                </Typography>

                <Chip
                  label={course.mode}
                  color={course.mode === 'Online' ? 'primary' : 'secondary'}
                  size="small"
                  sx={{ mt: 1, mb: 1 }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.desc}
                </Typography>

                <Button
                  component={m.button}
                  whileTap={{ scale: 0.95 }}
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: 'success.dark',
                      boxShadow: 5,
                    },
                  }}
                  onClick={() => alert(`🎉 Thanks for your interest in "${course.title}"!`)}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer CTA */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h5" color="#fff" gutterBottom>
          Start Your Learning Journey Today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            color: 'common.white',
            px: 6,
            py: 1.5,
            fontWeight: 'bold',
            bgcolor: 'gray.900',
            '&:hover': { bgcolor: 'gray.700' },
            textTransform: 'none',
            boxShadow: 4,
          }}
          onClick={() => alert('🌟 You are now ready to subscribe!')}
        >
          Subscribe to All Courses
        </Button>
      </Box>
    </Box>
  );
}
