'use client';
import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Fab, Card } from '@mui/material';
import { PlayArrowRounded, PauseRounded, Inventory } from '@mui/icons-material';
import Upcoming from '@/app/components/upcoming.js';
import About from '@/app/components/about';
import Calendar from '@/app/components/calendar';
import Link from 'next/link';

export default function Home() {
  const [windowSize, setWindowSize]: any[] = React.useState([]);
  const [audio, setAudio]: any[] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);

  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    if (window.innerWidth < 600) {
      setAudio(new Audio('https://stream.wsrnfm.com/listen'));
    }
  }, []);

  return (
    <Container sx={{ overflowX: 'hidden' }}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Grid container direction="row" justifyContent="space-between" item>
          <Grid item>
            <Typography
              style={{ fontFamily: 'Serif', color: '#EDF2F4' }}
              variant="h1"
              sx={{ mt: '2%' }}
            >
              WSRN
            </Typography>

            <Typography style={{ fontFamily: 'Serif', color: '#EDF2F4' }} variant="body1">
              Worldwide · Swarthmore · Radio · Network
            </Typography>
          </Grid>
          <Grid item sx={{ mt: '2%' }}>
            <Link href="/archives" passHref style={{ textDecoration: 'none' }}>
              <Inventory sx={{ color: 'white' }} fontSize="large"></Inventory>
            </Link>
          </Grid>
        </Grid>
        {/*
    <Upcoming></Upcoming>
     */}

        <Grid container item direction="row" justifyContent="space-between" sx={{ mt: '2%' }}>
          {windowSize[0] > 600 ? (
            <>
              <Grid item xs={6}>
                <About />
              </Grid>

              <Grid item xs={5}>
                <Calendar />
              </Grid>
            </>
          ) : null}
          {windowSize[0] < 600 ? (
            <Box sx={{ mt: '10%' }}>
              <Grid item xs={12}>
                <Calendar />
              </Grid>
              <Grid item xs={12} sx={{ mb: '50%' }}>
                <About />
              </Grid>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
