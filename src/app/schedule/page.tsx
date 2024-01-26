'use client';
import * as React from 'react';
import { Container, Box } from '@mui/material';
import Calendar from '../components/cal';

export default function App() {
  return (
    <div>
      <Container>
        <Box sx={{ mt: '5%' }}>
          {window.innerWidth < 500 ? (
            <Box sx={{ mt: '' }}>
              <Calendar
                initialView="timeGridDay"
                height="60vh"
                toolBar={{
                  right: 'prev,next',
                  center: 'title',
                  left: '',
                }}
              />
            </Box>
          ) : (
            <Calendar
              initialView="timeGridWeek"
              height="60vh"
              toolBar={{
                right: 'prev,next',
                center: 'title',
                left: 'timeGridDay,timeGridWeek today',
              }}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}
