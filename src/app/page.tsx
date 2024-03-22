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
    <Box>
      <Link href="/archives" passHref style={{ textDecoration: 'none' }}>
        <Inventory
          sx={{ position: 'absolute', top: 0, right: 0, mt: '2%', mr: '2%', color: 'white' }}
          fontSize="large"
        ></Inventory>
      </Link>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ ml: '2%', width: '98%' }}
      >
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
        {/*
    <Upcoming></Upcoming>
    
  */}
        {windowSize[0] > 600 ? (
          <Grid container item>
            <Grid item xs={6}>
              <About />
            </Grid>

            <Grid item xs={6}>
              <Calendar />
            </Grid>
          </Grid>
        ) : null}
        {windowSize[0] < 600 ? (
          <Grid container item>
            <Grid item xs={12}>
              <Calendar />
            </Grid>
            <Grid item xs={12} sx={{ mb: '50%' }}>
              <About />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}
