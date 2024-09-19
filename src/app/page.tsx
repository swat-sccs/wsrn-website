'use client';
import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Fab, Card, IconButton } from '@mui/material';
import About from '@/app/components/about';
import Calendar from '@/app/components/calendar';
import Link from 'next/link';
import Layout from '@/app/components/layout';
import InstagramIcon from '@mui/icons-material/Instagram';
import Upcoming from '@/app/components/upcoming_shows';
import CurrentShow from '@/app/components/now_playing_show';
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
      <Container sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        <Box sx={{ mt: 2 }}>
          <Grid container direction="row" justifyContent={'space-evenly'} spacing={5}>
            <Grid container item xs={12} lg={7} spacing={2} justifyContent="space-between">
              <Grid item xs={12} lg={12}>
                <ShowComp />
              </Grid>
              <Grid item display={{ xs: 'none', lg: 'block' }} lg={12}></Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={5}
              container
              direction="column"
              justifyContent="flex-start"
              spacing={2}
              alignContent="flex-end"
            >
              {/*Kind of a cheaty fix to add a little extra room to scroll on mobile */}
              <Grid item mb={{ xs: 20, md: 0 }} sx={{ minHeight: { lg: '32vh' } }}>
                {/*<Upcoming />*/}
                <About />
              </Grid>
              <Grid item container mt={{ xs: -12, lg: 0 }} mb={{ xs: 22, md: 0 }}>
                <CurrentShow />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
