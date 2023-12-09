'use client';
//import * as React from 'react';
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Button,
  Card,
  Box,
  CircularProgress,
  LinearProgress,
  Fab,
} from '@mui/material';
import Image from 'next/image';
import logo from '../../../img/wsrn2.png';
import styles from './page.module.css';
import useSWR from 'swr';
import { PlayArrow, Pause } from '@mui/icons-material';
import axios from 'axios';

const fetcher = (url) => fetch(url).then((res) => res.json());
const moment = require('moment');

export default function Player() {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);
  const [currentShow, setCurrentShow] = React.useState(false);
  const [showName, setShowName] = React.useState('');
  const { data, error, isLoading } = useSWR('/api/stream', fetcher, { refreshInterval: 5000 });

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
    if (isLoading) {
      return (
        <Box sx={{ minWidth: '20vw' }}>
          <CircularProgress />
        </Box>
      );
    } else {
      let showTitle = data.source.title;
      return (
        <>
          <Typography component="div" variant="h6" overflow="hidden">
            <span>{showTitle}</span>
          </Typography>
        </>
      );
    }
  };

  const checkCurrent = async () => {
    let data = [];
    await axios.get(`api/cal`).then((res) => {
      data = res.data;
    });
    const date = new Date()
      .toISOString()
      .replace(/-|:/g, '')
      .replace(/\.\d{3}Z/, 'Z')
      .replace('Z', '');

    for (let thing of data) {
      let start = moment(thing['start']);
      let end = moment(thing['end']);

      if (moment().diff(start, 'minutes') <= 60 && moment().diff(end, 'minutes') >= 0) {
        //console.log('THERES A SHOW');
        setShowName(thing['title']);
        setCurrentShow(true);
        break;
      } else {
        setCurrentShow(false);
      }
    }
  };

  React.useEffect(() => {
    setAudio(new Audio('https://stream.wsrnfm.com/listen'));
    checkCurrent();
  }, []);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', left: '0', height: '15vh' }}>
      <Card sx={{ display: 'flex', backgroundColor: '#30475E' }}>
        <CardContent sx={{ width: '100vw' }}>
          <Grid container direction="row" justifyContent="flex-start" sx={{ width: '100vw' }}>
            <Grid item xs={12} sx={{ mt: -2, width: '100vw', ml: -2 }}>
              <Loading />
            </Grid>

            <Grid container direction="row" justifyContent="flex-start" spacing={1}>
              <Grid item xs={3} lg={1}>
                <Image
                  style={{ width: '90%', height: '90%', borderRadius: '5px' }}
                  src={logo}
                  alt="Picture logo for WSRN"
                ></Image>
              </Grid>

              <Grid item xs={6} lg={10} mt={0}>
                <RenderPlayer />
              </Grid>

              <Grid item xs={1} lg={1} mt={'auto'} mb={'auto'}>
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
