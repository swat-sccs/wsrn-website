import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Image from 'next/image';
import logo from '../../../img/studio_a.jpg';

export default function App() {
  return (
    <Container>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Russo One"></link>

      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography
          style={{ fontFamily: 'Russo One', color: '#EDF2F4' }}
          sx={{ mt: '3%', textAlign: 'center', fontSize: '300%' }}
        >
          About Us
        </Typography>

        <Container
          sx={{
            mt: '2%',
            maxHeight: '52vh',
            overflowY: 'scroll',
          }}
        >
          <Typography variant="h6">
            WSRN [Worldwide Swarthmore Radio Network] is Swarthmore College's fiercely independent,
            student run radio station. We broadcast on 91.5 FM, and also on our website. Any dead
            air is filled by previously recorded shows. Our station is based in Parrish 4th.
          </Typography>
          <br />
          <br />
          <Typography variant="h6" sx={{ mt: '2%' }}>
            <b>Submission Policy:</b> If you have music that you want us to play, please send in:
            <li style={{ marginLeft: '3%' }}> 1. either an audio file or a playable link </li>
            <li style={{ marginLeft: '3%' }}>
              2. a blurb that you want us to read about the artist/music To
              wsrn-dj-owner@sccs.swarthmore.edu{' '}
            </li>
            <br />
            We play new music submissions from 5-6pm on Sundays during our New Music Sunday segment.
            Since this show will be recorded, and our station plays recorded shows to fill up dead
            air, your music may be played multiple times a week. We can’t guarantee that submitted
            music will be played (or if you submit an album that it will be played in its entirety).
            Our submission policy is brand new so we aim to be more responsive starting now (10/27).
          </Typography>
        </Container>
      </Grid>
      <Container></Container>
    </Container>
  );
}

/*
<Image
          style={{
            opacity: '0.2',
            width: '100%',
            height: '50%',
            borderRadius: '5px',
            position: 'absolute',
            left: '0',
            top: '25%',
            zIndex: '-1',
          }}
          src={logo}
          alt="Picture logo for WSRN"
        ></Image>
        
Submission Policy: If you have music that you want us to play, please send in: 1. either an audio
          file or a playable link, 2. a blurb that you want us to read about the artist / music To
          wsrn-dj-owner@sccs.swarthmore.edu We play new music submissions from 5-6pm on Sundays
          during our New Music Sunday segment. Since this show will be recorded, and our station
          plays recorded shows to fill up dead air, your music may be played multiple times a week.
          We can’t guarantee that submitted music will be played (or if you submit an album that it
          will be played in its entirety). Our submission policy is brand new so we aim to be more
          responsive starting now (10/27).

        */
