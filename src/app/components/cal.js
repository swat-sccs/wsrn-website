'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import listPlugin from '@fullcalendar/list';
import * as React from 'react';

import { Container } from '@mui/material';

export default function Calendar(props) {
  const event2 = {
    url: 'api/cal',
  };

  const date = new Date();
  const scrollTime =
    date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + date.getSeconds();

  return (
    <Container sx={{}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, iCalendarPlugin, listPlugin]}
        initialView={props.initialView}
        eventMinHeight={15}
        nowIndicator={true}
        allDaySlot={false}
        slotDuration={'00:30:00'}
        expandRows={true}
        scrollTime={scrollTime}
        height={props.height}
        events={event2}
        headerToolbar={props.toolBar}
        themeSystem={'bootstrap5'}
      />
    </Container>
  );
}
