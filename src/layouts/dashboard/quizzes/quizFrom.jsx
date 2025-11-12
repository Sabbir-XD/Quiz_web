import { Box, Paper, Typography } from '@mui/material';

export default function quizFrom() {
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
        <Paper sx={{ background: '#00A76F' }}>
          <Typography>hello English</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
