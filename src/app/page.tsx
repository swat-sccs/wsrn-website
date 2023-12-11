import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Calendar from '../app/components/cal.js';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: ['400'] });

export default function Home() {
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Russo One"></link>
      <Container>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          <Typography
            style={{ fontFamily: 'Russo One', color: '#EDF2F4' }}
            variant="h1"
            sx={{ mt: '10%' }}
          >
            WSRN
          </Typography>

          <Typography style={{ color: '#EDF2F4' }} variant="body1">
            Worldwide · Swarthmore · Radio · Network
          </Typography>
        </Grid>

        <Box sx={{ mt: '5%' }}></Box>
      </Container>
    </div>

    /*
      <Calendar
    initialView="dayGrid"
    height="40vh"
    toolBar={{
      right: '',
      center: '',
      left: '',
    }}
  />
  */
  );
}
