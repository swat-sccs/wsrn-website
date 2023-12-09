'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import { Container } from '@mui/material';

const event2 = {
  url: 'api/cal',
};

const toolBar = {
  right: 'prev,next',
  center: 'title',
  left: 'today',
};

const date = new Date();
const scrollTime =
  date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + date.getSeconds();

export default function Calendar() {
  return (
    <Container sx={{}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, iCalendarPlugin]}
        initialView="timeGridWeek"
        eventMinHeight={20}
        nowIndicator={true}
        allDaySlot={false}
        slotDuration={'01:00:00'}
        expandRows={true}
        scrollTime={scrollTime}
        height="65vh"
        events={event2}
        headerToolbar={toolBar}
      />
    </Container>
  );
}
