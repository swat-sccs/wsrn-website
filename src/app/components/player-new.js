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
import { useTheme } from '@mui/material';

const moment = require('moment');

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Player() {
  const theme = useTheme();
  const audioElmRef = React.useRef(null);
  const pathname = usePathname();
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [audioLoad, setAudioLoad] = React.useState(false);
  const [currentShow, setCurrentShow] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState([]);
  const [icecast, setIcecast] = useState();
  const [audioElement, setAudioElement] = React.useState(null);
  const [analyzerData, setAnalyzerData] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [bottomHeight, setBottomHeight] = React.useState('15vh');
  const [STREAM, setSTREAM] = React.useState(null);
  const [_analyser, set_analyser] = React.useState(null);
  const [metadata, setMetadata] = React.useState({ title: 'Listen to WSRN!', listeners: 0 });

  const url = 'https://icecast.wsrn.sccs.swarthmore.edu';
  const station = {
    name: 'WSRN Radio',
    endpoint: `${url}/listen.mp3`,
    enableCodecUpdate: true,
    metadataTypes: ['icy'],
  };

  useEffect(() => {
    setAudioElement(new Audio());
  }, []);

  useEffect(() => {
    if (!audioElement) return;
    const loadPlayer = async () => {
      const { default: IcecastMetadataPlayer } = await import(`icecast-metadata-player`);

      setIcecast(
        new IcecastMetadataPlayer(station.endpoint, {
          crossorigin: 'anonymous',
          icyDetectionTimeout: 5000,
          enableLogging: true,
          metadataTypes: station.metadataTypes,
          audioElement: audioElement,
          endpoints: station.endpoints,
          onMetadata: async (metadata) => {
            //STREAM.title = metadata.StreamTitle;
            setSTREAM(metadata.StreamTitle);
            setAudioLoad(false);
          },
          onError: (message, error) => {
            console.log(message, error);
          },
          onRetry: () => {
            setAudioLoad(true);
            console.log('Connection Lost.. Retrying');
          },
          onWarn: (message) => {
            console.log(message);
          },
          onStreamEnd: () => {
            console.log('Stream Ended');
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

  useEffect(() => {
    //If metadata is found try and look for the rest of the data
    let _metadata = { title: 'Listen to WSRN!', listeners: 0 };
    if (STREAM) {
      _metadata = data.source.find((source) => source.title == STREAM);
      if (!_metadata) {
        _metadata = { title: 'Listen to WSRN!', listeners: 0 };
      }
    }
    console.log(_metadata);

    if (_metadata.hasOwnProperty('listeners')) {
      setMetadata(_metadata);
    } else {
      _metadata['listeners'] = 0;
      setMetadata(_metadata);
    }
  }, [STREAM, data]);

  const togglePlaying = useCallback(() => {
    if (!audioContext) {
      // create a new AudioContext
      const _audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // create an analyzer node with a buffer size of 2048
      const analyser = _audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const source = _audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      source.connect(_audioContext.destination);

      setAudioContext(_audioContext);
      setPlaying(true);
      //console.log(analyser);
      setAnalyzerData({ analyser, bufferLength, dataArray });
    }

    if (!icecast) {
      return;
    }

    if (playing) {
      icecast.stop();
      setAudioLoad(false);
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
          <Box color="white">
            <LinearProgress color="inherit" />
          </Box>
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
      return <Box></Box>;
    } else if (!isLoading && !error && !showName_isLoading) {
      if (showName.Show != 'NA' && showName.switch == 'B') {
        return (
          <>
            <Typography component="div" variant="h6" overflow="hidden">
              <Sensors sx={{ height: 20, width: 20 }} /> LIVE &nbsp; &nbsp;
              <Headphones sx={{ height: 20, width: 20 }} /> {metadata.listeners}
              &nbsp;
            </Typography>
            <Typography variant="h6" overflow="auto" sx={{ fontFamily: 'Serif', mt: '1%' }}>
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
              <Headphones sx={{ height: 20, width: 20 }} /> {metadata.listeners}
              &nbsp;
            </Typography>
            <Typography component="div" variant="h6" overflow="auto" sx={{ mt: '1%' }}>
              WSRN Radio Live
            </Typography>
          </>
        );
      } else {
        return (
          <>
            &nbsp;
            <Headphones sx={{ height: 20, width: 20 }} /> {metadata.listeners}
            <Typography variant="h6" overflow="auto" sx={{ mt: '1%' }}>
              {metadata.title}
            </Typography>
          </>
        );
      }
    }
    return (
      <>
        &nbsp;
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  React.useEffect(() => {
    //setAudio(new Audio('https://icecast.wsrn.sccs.swarthmore.edu/listen'));
    setWindowSize([window.innerWidth, window.innerHeight]);
    if (window.innerWidth < 500) {
      setBottomHeight('16vh');
    }
  }, []);

  return (
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
      {windowSize[0] > 600 ? (
        <Typography
          sx={{ position: 'absolute', bottom: 0, right: 0, mr: '1%', mb: '1%' }}
          onClick={() => openInNewTab('https://publicfiles.fcc.gov/fm-profile/wsrn-fm')}
          variant="body1"
          style={{ cursor: 'pointer' }}
        >
          FCC Pubilc File
        </Typography>
      ) : null}

      <Card
        sx={{
          display: 'flex',
          backgroundColor: theme.palette.secondary.main,
          height: '100%',
          borderRadius: '10px',
        }}
      >
        <CardContent>
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
              {windowSize[0] < 600 ? (
                <Grid item xs={3}>
                  <PlayPauseComponent></PlayPauseComponent>
                </Grid>
              ) : (
                <Grid item lg={'auto'}>
                  <PlayPauseComponent></PlayPauseComponent>
                </Grid>
              )}
              <Grid item xs={9} lg={'auto'}>
                <RenderPlayer />
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
