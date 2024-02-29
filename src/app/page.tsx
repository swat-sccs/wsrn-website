'use client';
import React, { useState } from 'react';

import { Container, Grid, Typography, Box, Fab, Card } from '@mui/material';
import Calendar from '../app/components/cal.js';
import { Russo_One } from 'next/font/google';
import { PlayArrowRounded, PauseRounded, Sensors } from '@mui/icons-material';
import useSWR from 'swr';
import Upcoming from '@/app/components/upcoming.js';

const russo = Russo_One({ subsets: ['latin'], weight: ['400'] });

export default function Home() {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const [windowSize, setWindowSize]: any[] = React.useState([]);
  const [audio, setAudio]: any[] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);

  const {
    data: showName,
    error: showName_error,
    isLoading: showName_isLoading,
  } = useSWR('/api/states', fetcher, {
    refreshInterval: 2000,
  });

  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    if (window.innerWidth < 600) {
      setAudio(new Audio('https://stream.wsrnfm.com/listen'));
    }
  }, []);

  const play = () => {
    setAudioLoad(true);
    audio.play();
    setPlaying(true);

    audio.onplaying = async function () {
      console.log('Metadata for audio loaded');
      setAudioLoad(false);
    };
  };

  const pause = () => {
    setAudioLoad(false);
    console.log('pausing!');
    audio.pause();
    setPlaying(false);
  };
  /*
   <Card sx={{ width: '200px', height: '200px', borderRadius: '500px' }}>
            <PlayArrow
              sx={{ height: 200, width: 200, position: 'relative', top: '5%', left: '5%' }}
            />
          </Card>
  */

  const PlayPause = () => {
    if (!playing) {
      return (
        <>
          <PlayArrowRounded onClick={() => play()} sx={{ height: 200, width: 200 }} />
        </>
      );
    }
    if (playing) {
      return (
        <>
          <PauseRounded onClick={() => pause()} sx={{ height: 200, width: 200 }} />
        </>
      );
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Russo One"></link>
      <Container>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          <Grid item>
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
          {/*
    <Upcoming></Upcoming>
    
  */}

          {windowSize[0] < 600 ? (
            <Grid item sx={{ mt: 5 }}>
              <Grid container justifyContent="center" alignContent="center">
                <Grid item>
                  <PlayPause></PlayPause>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
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
