import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingTime() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{ml:"50%"}} />
    </Box>
  );
}