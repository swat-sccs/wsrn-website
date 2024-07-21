import * as React from 'react';
import { Container, Grid, Typography, Link, Card, Box, Divider } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Image from 'next/image';
import logo from '../../../img/studio_a.jpg';

export default function About() {
  if (window.innerWidth > 500) {
    return (
      <Container sx={{ borderRadius: 4, backgroundColor: 'primary.main', p: 2 }}>
        <Grid container>
          <Grid item>
            <Typography variant="h4" color="darkblue.main">
              About Us
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="darkblue.main">
              WSRN [Worldwide Swarthmore Radio Network] is Swarthmore College's fiercely
              independent, student run radio station. We broadcast on 91.5 FM, and also on our
              website. Any dead air is filled by previously recorded shows. Our station is based in
              Parrish 4th. We play new music submissions on Sundays during our New Music Sunday
              segment. Since this show will be recorded, and our station plays recorded shows to
              fill up dead air, your music may be played multiple times a week. We can’t guarantee
              that submitted music will be played (or if you submit an album that it will be played
              in its entirety).
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return (
    <Box sx={{ mt: '10%', width: '90vw' }}>
      <Typography
        sx={{ fontWeight: 'bold', mt: '3%', whiteSpace: 'pre-wrap' }}
        variant="h5"
        textAlign="left"
      >
        Submission Policy:
      </Typography>

      <Typography variant="body1" sx={{ mt: '1%' }} textAlign={'left'}>
        If you have music that you want us to play, please send in:
      </Typography>

      <Typography variant="body1" sx={{}} textAlign={'left'}>
        1. Either an audio file or a link
      </Typography>

      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: '2%' }} textAlign={'left'}>
        2. A blurb about the artist/music to &nbsp;
        <br></br>
        <Link href="mailto: wsrn-dj-owner@sccs.swarthmore.edu" sx={{ ml: '20px' }}>
          wsrn-dj-owner@ sccs.swarthmore.edu
        </Link>
      </Typography>

      <Divider sx={{ backgroundColor: 'white', mt: '10%', mb: '10%' }} />

      <Typography variant="h4" style={{ color: '#EDF2F4' }} sx={{ mt: '3%', textAlign: 'left' }}>
        About Us
      </Typography>

      <Typography variant="body1" textAlign="left">
        WSRN [Worldwide Swarthmore Radio Network] is Swarthmore College's fiercely independent,
        student run radio station. We broadcast on 91.5 FM, and also on our website. Any dead air is
        filled by previously recorded shows. Our station is based in Parrish 4th. We play new music
        submissions from 5-6pm on Sundays during our New Music Sunday segment. Since this show will
        be recorded, and our station plays recorded shows to fill up dead air, your music may be
        played multiple times a week. We can’t guarantee that submitted music will be played (or if
        you submit an album that it will be played in its entirety). Our submission policy is brand
        new so we aim to be more responsive starting now (10/27).
      </Typography>
    </Box>
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
