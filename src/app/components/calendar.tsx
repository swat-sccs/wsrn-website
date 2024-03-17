'use client';
import * as React from 'react';
import { Container, Box } from '@mui/material';
import Calendar from './cal';

export default function CalendarPage() {
  const [windowSize, setWindowSize]: any = React.useState([]);
  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);
  return (
    <Box>
      <Box sx={{ mt: '5%', width: '45vw' }}>
        {windowSize[0] < 500 ? (
          <Box sx={{ mt: '' }}>
            <Calendar
              initialView="timeGridDay"
              height="40vh"
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
    </Box>
  );
}
