import * as React from 'react';
import { Container, Box } from '@mui/material';
import Calendar from '../components/cal';

export default function App() {
  return (
    <div>
      <Container>
        <Box sx={{ mt: '5%' }}>
          <Calendar
            initialView="timeGridWeek"
            height="60vh"
            toolBar={{
              right: 'prev,next',
              center: 'title',
              left: 'timeGridDay,timeGridWeek today',
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
