'use client';
//import * as React from 'react';
import React, { useState, useEffect, useCallback } from 'react';
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
  Container,
} from '@mui/material';
import Image from 'next/image';
import logo from '../../../img/wsrn2.png';
import logo2 from '../../../img/archives.png';
import { Headphones } from '@mui/icons-material';
import useSWR from 'swr';
import { PlayArrowRounded, PauseRounded, PlayArrow, Pause, Sensors } from '@mui/icons-material';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { usePathname } from 'next/navigation';

const moment = require('moment');

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Player() {
  const pathname = usePathname();
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);
  const [currentShow, setCurrentShow] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState([]);
  const [icecast, setIcecast] = useState();
  const [audioElement, setAudioElement] = React.useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [bottomHeight, setBottomHeight] = React.useState('15vh');
  const url = 'https://icecast.wsrn.sccs.swarthmore.edu';
  const station = {
    name: 'WSRN Radio',
    endpoint: `${url}/listen`,
    codec: 'AAC',
    metadataTypes: [],
  };

  useEffect(() => {
    setAudioElement(new Audio());
  }, []);

  useEffect(() => {
    if (!audioElement) return;
    const loadPlayer = async () => {
      const { default: IcecastMetadataPlayer } = await import('icecast-metadata-player');

      setIcecast(
        new IcecastMetadataPlayer(station.endpoint, {
          crossorigin: 'anonymous',
          icyDetectionTimeout: 5000,
          enableLogging: true,
          metadataTypes: station.metadataTypes,
          audioElement,
          onMetadata: (metadata) => {
            console.log(metadata);
          },
        }),
      );
    };
    loadPlayer();
  }, [audioElement]);

  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSWR('/api/stream', fetcher, { refreshInterval: 4000 });

  const {
    data: showName,
    error: showName_error,
    isLoading: showName_isLoading,
  } = useSWR('/api/states', fetcher, {
    refreshInterval: 2000,
  });

  const togglePlaying = useCallback(() => {
    if (!audioContext) {
      const _audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const source = _audioContext.createMediaElementSource(audioElement);
      source.connect(_audioContext.destination);

      const _analyser = _audioContext.createAnalyser();
      _analyser.fftSize = 256;

      source.connect(_analyser);

      setAudioContext(_audioContext);
      setPlaying(true);
    }

    if (!icecast) return;

    if (playing) {
      icecast.stop();
      setPlaying(false);
      return;
    }

    if (audioContext) audioContext.resume();
    icecast.play();
    setPlaying(true);
  }, [playing, icecast]);

  const Loading = () => {
    if (audioLoad) {
      return (
        <>
          <LinearProgress />
        </>
      );
    }
  };

  const PlayPauseComponent = () => {
    if (!playing) {
      return (
        <>
          <PlayArrow onClick={() => togglePlaying()} sx={{ height: 100, width: 100 }} />
        </>
      );
    }
    return (
      <>
        <Pause onClick={() => togglePlaying()} sx={{ height: 100, width: 100 }} />
      </>
    );
  };

  const RenderPlayer = () => {
    if (showName_isLoading || (isLoading && !error && !showName_error)) {
      return (
        <Box sx={{ minWidth: '20vw' }}>
          <CircularProgress />
        </Box>
      );
    } else if (!isLoading && !error && !showName_isLoading) {
      if (showName.Show != 'NA' && showName.switch == 'B') {
        return (
          <>
            <Typography component="div" variant="h6" overflow="hidden">
              <Sensors sx={{ height: 20, width: 20 }} /> LIVE &nbsp; &nbsp;
              <Headphones sx={{ height: 20, width: 20 }} /> {data.source.listeners}
              &nbsp;
            </Typography>
            <Typography
              component="div"
              variant="h6"
              overflow="hidden"
              sx={{ fontFamily: 'Serif', mt: '1%' }}
            >
              {showName.Show}
            </Typography>
          </>
        );
      }
      if (showName.Show == 'NA' && showName.switch == 'B') {
        return (
          <>
            <Typography component="div" variant="h6" overflow="hidden">
              <Sensors sx={{ height: 20, width: 20 }} /> LIVE &nbsp; &nbsp;
              <Headphones sx={{ height: 20, width: 20 }} /> {data.source.listeners}
              &nbsp;
            </Typography>
            <Typography component="div" variant="h6" overflow="hidden" sx={{ mt: '1%' }}>
              WSRN Radio Live
            </Typography>
          </>
        );
      } else {
        return (
          <>
            &nbsp;
            <Headphones sx={{ height: 20, width: 20 }} /> {data.source.listeners}
            <Typography component="div" variant="h6" overflow="hidden" sx={{ mt: '1%' }}>
              {data.source.title}
            </Typography>
          </>
        );
      }
    }
    return (
      <>
        &nbsp;
        <Chip
          label={1}
          style={{ backgroundColor: '#223547' }}
          icon={<Headphones sx={{ height: 20, width: 20 }} />}
        ></Chip>
        <Typography component="div" variant="h6" overflow="hidden" sx={{ mt: '1%' }}>
          WSRN Archives
        </Typography>
      </>
    );
  };

  const RenderImage = () => {
    if (!showName_isLoading && !showName_error) {
      if (showName.switch == 'B') {
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
  };

  const PlayPauseMobile = () => {
    if (!playing) {
      return (
        <>
          <PlayArrowRounded onClick={() => togglePlaying()} sx={{ height: 200, width: 200 }} />
        </>
      );
    }
    if (playing) {
      return (
        <>
          <PauseRounded onClick={() => togglePlaying()} sx={{ height: 200, width: 200 }} />
        </>
      );
    }
  };

  React.useEffect(() => {
    //setAudio(new Audio('https://icecast.wsrn.sccs.swarthmore.edu/listen'));
    setWindowSize([window.innerWidth, window.innerHeight]);
    if (window.innerWidth < 500) {
      setBottomHeight('17vh');
    }
  }, []);

  return (
    <Box>
      {windowSize[0] < 600 && pathname == '/' ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <PlayPauseMobile></PlayPauseMobile>
          </Grid>
        </Grid>
      ) : null}

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          left: '0',
          height: bottomHeight,
          zIndex: '10',
        }}
      >
        <Card sx={{ display: 'flex', backgroundColor: 'rgb(100,150,100)', height: '100%' }}>
          <CardContent sx={{ width: '100vw' }}>
            <Grid container direction="row" sx={{ width: '100vw' }}>
              <Grid item xs={12} sx={{ mt: -2, width: '100vw', ml: -2 }}>
                <Loading />
              </Grid>

              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {windowSize[0] > 500 ? (
                  <Grid item xs={1} sm={1} md={1} lg={1}>
                    <PlayPauseComponent></PlayPauseComponent>
                  </Grid>
                ) : null}

                <Grid item xs={4} mt={0}>
                  <RenderPlayer />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

//https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c-d90429

//https://stackoverflow.com/questions/67116204/possibility-to-record-playback-of-browser-audio-element-using-javascript

//https://www.npmjs.com/package/react-audio-visualize
