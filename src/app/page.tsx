'use client';
import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Fab, Card, IconButton } from '@mui/material';
import About from '@/app/components/about';
import Calendar from '@/app/components/calendar';
import Link from 'next/link';
import Layout from '@/app/components/layout';
import InstagramIcon from '@mui/icons-material/Instagram';
import Upcoming from '@/app/components/upcoming_shows';

import ShowComp from '@/app/components/show_comp';

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
    <Layout
      title={
        <>
          91.5 FM
          <Link href="https://www.instagram.com/wsrn.fm/">
            <IconButton aria-label="delete" size="large">
              <InstagramIcon fontSize="inherit" />
            </IconButton>
          </Link>
        </>
      }
    >
      <Container sx={{ overflowX: 'hidden' }}>
        {windowSize[0] > 600 ? (
          <Box sx={{ mt: 2 }}>
            <Grid container direction="row" justifyContent={'space-evenly'} spacing={5}>
              <Grid container item xs={7} spacing={2} justifyContent="space-between">
                <Grid item xs={12}>
                  <ShowComp />
                </Grid>
                <Grid item xs={12}>
                  <About />
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid item>
                  <Upcoming />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : null}
        {windowSize[0] < 600 ? (
          <Grid item xs={12} sm={6}>
            <Box sx={{ mt: '10%' }}>
              <Grid item xs={12}>
                <Calendar />
              </Grid>
              <Grid item xs={12} sx={{ mb: '50%' }}>
                <About />
              </Grid>
            </Box>
          </Grid>
        ) : null}
      </Container>
    </Layout>
  );
}
