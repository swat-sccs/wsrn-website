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
      <Box>
        {windowSize[0] < 500 ? (
          <Box>
            <Calendar
              initialView="listDay"
              height="45vh"
              toolBar={{
                right: 'prev,next',
                center: 'title',
                left: '',
              }}
            />
          </Box>
        ) : (
          <Box>
            <Calendar
              initialView="listDay"
              height="60vh"
              toolBar={{
                right: 'prev,next',
                center: 'title',
                left: 'listDay,timeGridWeek today',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
