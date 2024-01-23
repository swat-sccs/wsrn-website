'use client';
//import * as React from 'react';
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Chip,
  Card,
  Box,
  CircularProgress,
  LinearProgress,
  Fab,
} from '@mui/material';
import Image from 'next/image';
import logo from '../../../img/wsrn2.png';
import logo2 from '../../../img/archives.png';

import styles from './page.module.css';
import useSWR from 'swr';
import { PlayArrow, Pause, Sensors } from '@mui/icons-material';
import axios from 'axios';
import AudioMotionAnalyzer from 'audiomotion-analyzer';

const moment = require('moment');
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Player() {
  const fetcher2 = (url) => axios.get(url).then((res) => res.data);

  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);
  const [currentShow, setCurrentShow] = React.useState(false);

  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSWR('/api/stream', fetcher, { refreshInterval: 5000 });
  const {
    data: states,
    error: state_error,
    isLoading: state_isLoading,
  } = useSWR('/api/states', fetcher, {
    refreshInterval: 1000,
  });

  const {
    data: showName,
    error: showName_error,
    isLoading: showName_isLoading,
  } = useSWR('/api/cal', fetcher, {
    refreshInterval: 2000,
  });

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

  const Loading = () => {
    if (audioLoad) {
      return (
        <>
          <LinearProgress />
        </>
      );
    }
  };

  const PlayPause = () => {
    if (!playing) {
      return (
        <>
          <Fab onClick={() => play()} aria-label="Play" variant="outlined" color="primary">
            <PlayArrow sx={{ height: 50, width: 50 }} />
          </Fab>
        </>
      );
    }
    if (playing) {
      return (
        <>
          <Fab onClick={() => pause()} variant="outlined" color="primary" aria-label="Pause">
            <Pause sx={{ height: 50, width: 50 }} />
          </Fab>
        </>
      );
    }
  };

  const RenderPlayer = () => {
    if (showName_isLoading || (isLoading && !error && !showName_error)) {
      return (
        <Box sx={{ minWidth: '20vw' }}>
          <CircularProgress />
        </Box>
      );
    } else if (!isLoading && !error && !showName_isLoading) {
      if (showName.Show != 'NA' && states.switch == 'B') {
        return (
          <>
            <Typography component="div" variant="h6" overflow="hidden">
              <Chip
                label="LIVE"
                style={{ backgroundColor: '#F05454' }}
                icon={<Sensors sx={{ height: 20, width: 20 }} />}
              ></Chip>
              &nbsp;
            </Typography>
            <Typography component="div" variant="h6" overflow="hidden" sx={{ mt: '1%' }}>
              {showName.Show}
            </Typography>
          </>
        );
      } else {
        return (
          <>
            <Typography component="div" variant="h6" overflow="hidden" sx={{ mt: '1%' }}>
              {data.source.title}
            </Typography>
          </>
        );
      }
    } else {
      return (
        <Box sx={{ minWidth: '20vw' }}>
          <Typography variant="h6">
            Something went wrong... Please try refreshing the page
          </Typography>
        </Box>
      );
    }
  };

  const RenderImage = () => {
    if (!state_isLoading && !state_error) {
      if (states.switch == 'B') {
        return (
          <>
            <Image
              style={{ width: '90%', height: '90%', borderRadius: '5px' }}
              src={logo}
              alt="Picture logo for WSRN"
            ></Image>
          </>
        );
      } else {
        return (
          <>
            <Image
              style={{ width: '90%', height: '90%', borderRadius: '5px' }}
              src={logo2}
              alt="Picture logo for WSRN"
            ></Image>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  React.useEffect(() => {
    setAudio(new Audio('https://stream.wsrnfm.com/listen'));
  }, []);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', left: '0', height: '15vh' }}>
      <Card sx={{ display: 'flex', backgroundColor: '#30475E', opacity: 0.9, height: '100%' }}>
        <CardContent sx={{ width: '100vw' }}>
          <Grid container direction="row" justifyContent="flex-start" sx={{ width: '100vw' }}>
            <Grid item xs={12} sx={{ mt: -2, width: '100vw', ml: -2 }}>
              <Loading />
            </Grid>

            <Grid container direction="row" justifyContent="flex-start" spacing={1}>
              <Grid item xs={3} lg={1}>
                <RenderImage />
              </Grid>

              <Grid item xs={6} lg={10} mt={0}>
                <RenderPlayer />
              </Grid>

              <Grid item xs={1} lg={1} mt={'1%'} mb={'auto'}>
                <PlayPause></PlayPause>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

//https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c-d90429

//https://stackoverflow.com/questions/67116204/possibility-to-record-playback-of-browser-audio-element-using-javascript

//https://www.npmjs.com/package/react-audio-visualize
