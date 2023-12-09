import * as React from 'react';
import { Container, Box } from '@mui/material';
import Calendar from '../components/cal';
export default function App() {
  return (
    <div>
      <Container>
        <Box sx={{ mt: '5%' }}>
          <Calendar />
        </Box>
      </Container>
    </div>
  );
}
