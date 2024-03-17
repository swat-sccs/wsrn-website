import * as React from 'react';
import { Container, Grid, Typography, Link, Card, Box, Divider } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Image from 'next/image';
import logo from '../../../img/studio_a.jpg';

export default function About() {
  return (
    <Box sx={{ mt: '2%', width: '90vw' }}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid item container spacing={10}>
          <Grid item xs={2}>
            {' '}
            <Typography
              sx={{ fontWeight: 'bold', mt: '3%', whiteSpace: 'pre-wrap' }}
              variant="h5"
              textAlign="right"
            >
              Submission Policy:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h4"
              style={{ color: '#EDF2F4' }}
              sx={{ mt: '3%', textAlign: 'left' }}
            >
              About Us
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: '1px' }}>
          <Grid item xs={2} lg={1.5}>
            <Typography variant="body1" sx={{ mt: '1%' }} textAlign={'right'}>
              If you have music that you want us to play, please send in:
            </Typography>

            <Typography variant="body1" sx={{}} textAlign={'right'}>
              1. Either an audio file or a link
            </Typography>

            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-wrap', mb: '2%' }}
              textAlign={'right'}
            >
              2. A blurb about the artist/music to &nbsp;
              <Link href="mailto: wsrn-dj-owner@sccs.swarthmore.edu">
                wsrn-dj-owner@ sccs.swarthmore.edu
              </Link>
            </Typography>
          </Grid>
          <Grid item no-gutters>
            <Divider orientation="vertical" sx={{ backgroundColor: 'white' }} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" textAlign="left">
              WSRN [Worldwide Swarthmore Radio Network] is Swarthmore College's fiercely
              independent, student run radio station. We broadcast on 91.5 FM, and also on our
              website. Any dead air is filled by previously recorded shows. Our station is based in
              Parrish 4th.
            </Typography>
            <Typography variant="body1" textAlign="left">
              We play new music submissions from 5-6pm on Sundays during our New Music Sunday
              segment. Since this show will be recorded, and our station plays recorded shows to
              fill up dead air, your music may be played multiple times a week. We can’t guarantee
              that submitted music will be played (or if you submit an album that it will be played
              in its entirety). Our submission policy is brand new so we aim to be more responsive
              starting now (10/27).
            </Typography>
          </Grid>
        </Grid>
      </Grid>
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
