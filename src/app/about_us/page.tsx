import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
export default function App() {
  return (
    <Container>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Russo One"></link>

      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography
          style={{ fontFamily: 'Russo One', color: '#EDF2F4' }}
          variant="h1"
          sx={{ mt: '5%', textAlign: 'center' }}
        >
          About Us
        </Typography>

        <Box sx={{ maxWidth: '70vw', ml: 'auto', mr: 'auto', mt: '10%' }}>
          <Typography variant="h6">
            <RadioButtonUnchecked sx={{ mr: '2%' }} />
            WSRN [Worldwide Swarthmore Radio Network] is Swarthmore College's fiercely independent,
            student run radio station.
          </Typography>
          <Typography variant="h6">
            <RadioButtonUnchecked sx={{ mr: '2%' }} />
            We broadcast on 91.5 FM, and also on our website.
          </Typography>
          <Typography variant="h6">
            <RadioButtonUnchecked sx={{ mr: '2%' }} />
            Any dead air is filled by previously recorded shows.
          </Typography>

          <Typography variant="h6">
            <RadioButtonUnchecked sx={{ mr: '2%' }} />
            Our station is based in Parrish 4th.
          </Typography>
        </Box>
      </Grid>
    </Container>
  );
}

/*
Submission
          Policy: If you have music that you want us to play, please send in: 1. either an audio
          file or a playable link, 2. a blurb that you want us to read about the artist / music To
          wsrn-dj-owner@sccs.swarthmore.edu We play new music submissions from 5-6pm on Sundays
          during our New Music Sunday segment. Since this show will be recorded, and our station
          plays recorded shows to fill up dead air, your music may be played multiple times a week.
          We can’t guarantee that submitted music will be played (or if you submit an album that it
          will be played in its entirety). Our submission policy is brand new so we aim to be more
          responsive starting now (10/27).

        */
