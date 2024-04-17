'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import styles from './page.module.css';
import * as React from 'react';
import styled from '@emotion/styled';

import { Container } from '@mui/material';

//

export default function Calendar(props) {
  const event2 = {
    url: 'api/cal',
    format: 'ics',
  };

  const events = {
    googleCalendarId:
      'c_cf9837abb211b7859aceeba417f7548aa7befd045fedb8b6bf4835d8c300b3e1@group.calendar.google.com',
  };
  const date = new Date();
  const scrollTime =
    date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + date.getSeconds();

  // add styles as css
  const StyleWrapper = styled.div`
    .fc-event:hover {
      --fc-list-event-hover-bg-color: rgba(255, 255, 255, 0);
    }

    .fc-list-day-cushion {
      background-color: #7798ab;
      background-image: none;
    }
  `;
  return (
    <StyleWrapper sx={{ overflowY: 'scroll' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, iCalendarPlugin, listPlugin, googleCalendarPlugin]}
        initialView={props.initialView}
        eventMinHeight={10}
        nowIndicator={'true'}
        allDaySlot={false}
        slotEventOverlap={true}
        slotDuration={'00:30:00'}
        expandRows={true}
        scrollTime={scrollTime}
        height={props.height}
        events={events}
        headerToolbar={props.toolBar}
        googleCalendarApiKey={process.env.NEXT_PUBLIC_GAPISECRET}
        eventClick={function (info) {
          info.jsEvent.preventDefault(); // don't let the browser navigate
        }}
      />
    </StyleWrapper>
  );
}
