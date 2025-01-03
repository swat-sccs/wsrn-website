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
  IconButton,
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
  const [metadata, setMetadata] = React.useState(null);
  const [audioLoad, setAudioLoad] = React.useState(false);
  const [currentShow, setCurrentShow] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState([]);
  const [icecast, setIcecast] = useState();
  const [audioElement, setAudioElement] = React.useState(null);
  const [analyzerData, setAnalyzerData] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [bottomHeight, setBottomHeight] = React.useState('8vh');
  const [STREAM, setSTREAM] = React.useState('Listen to WSRN!');
  const [_analyser, set_analyser] = React.useState(null);

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
          icyDetectionTimeout: 1000,
          metadataTypes: station.metadataTypes,
          audioElement: audioElement,
          endpoints: station.endpoints,
          onMetadata: async (metadata) => {
            //STREAM.title = metadata.StreamTitle;
            console.log(metadata);
            setMetadata(metadata);
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
    refreshInterval: 5000,
  });

  const togglePlaying = useCallback(() => {
    console.log('Trying to play');
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
        <IconButton
          disableRipple
          onClick={() => togglePlaying()}
          color="darkblue"
          sx={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <PlayArrow sx={{ height: 75, width: 75 }} />
        </IconButton>
      );
    }

    return (
      <IconButton disableRipple onClick={() => togglePlaying()}>
        <Pause color="darkblue" sx={{ height: 75, width: 75 }} />
      </IconButton>
    );
  };

  const RenderPlayer = () => {
    if (showName) {
      if (!isLoading && !error && !showName_isLoading) {
        //If Live But with title then use title from mac rip
        if (showName.title != 'null' && showName.live_state == 1) {
          return (
            <>
              <Grid container spacing={0} justifyContent="space-evenly" alignItems="center">
                <Grid item>
                  <Typography
                    fontSize="1rem"
                    variant="h6"
                    fontWeight="bold"
                    overflow="auto"
                    display="flex"
                    flex-direction="row"
                    sx={{ mt: '10%', color: theme.palette.darkblue.main }}
                  >
                    {showName.title}
                  </Typography>
                  <Typography
                    fontSize="1rem"
                    variant="h6"
                    fontWeight="bold"
                    overflow="auto"
                    display="flex"
                    flex-direction="row"
                    sx={{ mt: '2%', color: theme.palette.darkblue.main }}
                  >
                    {showName.artist}
                  </Typography>
                </Grid>
                {/*
                {showName.album_art != 'null' ? (
                  <Grid item>
                    <Box
                      component="img"
                      sx={{
                        maxHeight: { xs: 60, lg: 60 },
                        maxWidth: { xs: 60, lg: 60 },
                        borderRadius: 2,
                      }}
                      src={`data:image/png;base64, ${showName.album_art}`}
                    ></Box>
                  </Grid>
                ) : null}
                  */}
              </Grid>
            </>
          );
        }
        //If Live but No title
        if (showName.title == 'null' && showName.live_state == 1) {
          return (
            <>
              <Typography component="div" variant="h6" overflow="hidden">
                <Sensors sx={{ height: 20, width: 20, color: theme.palette.darkblue.main }} /> LIVE
                &nbsp; &nbsp;
                {/*
                <Headphones sx={{ height: 20, width: 20 }} /> {metadata.listeners}
                */}
                &nbsp;
              </Typography>
              <Typography
                fontSize="1rem"
                component="div"
                variant="h6"
                overflow="auto"
                sx={{ mt: '1%', color: theme.palette.darkblue.main }}
              >
                WSRN Radio Live
              </Typography>
            </>
          );
        } else {
          //Not live so using sttas from icecast streamer

          if (showName.title != 'null' && showName.live_state == 0) {
            return (
              <>
                &nbsp;
                {/*
                <Headphones sx={{ height: 20, width: 20 }} /> {metadata.listeners}
                */}
                <Grid container spacing={{ xs: 2, lg: 8 }}>
                  <Grid item xs={9} lg={'auto'}>
                    <Typography
                      fontSize="1rem"
                      variant="h5"
                      fontWeight="bold"
                      overflow="auto"
                      sx={{ color: theme.palette.darkblue.main }}
                    >
                      {showName.stats.source.title}
                    </Typography>

                    <Typography
                      fontSize="1rem"
                      variant="h6"
                      overflow="auto"
                      sx={{ mt: '1%', color: theme.palette.darkblue.main }}
                    ></Typography>
                  </Grid>
                </Grid>
              </>
            );
          }
        }
      }
      return (
        <>
          &nbsp;
          <Typography
            component="div"
            variant="h6"
            overflow="hidden"
            sx={{ mt: '1%', color: theme.palette.darkblue.main }}
          >
            WSRN Archives
          </Typography>
        </>
      );
    }
    return (
      <>
        &nbsp;
        {/*
        <Headphones sx={{ height: 20, width: 20 }} /> 0
        */}
        <Typography
          variant="h6"
          overflow="auto"
          sx={{ mt: '1%', color: theme.palette.darkblue.main }}
        ></Typography>
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
          <PauseRounded
            onClick={() => togglePlaying()}
            sx={{ height: 200, width: 200, color: theme.palette.darkblue.main }}
          />
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
      setBottomHeight('15vh');
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          left: '0',
          height: bottomHeight,
          zIndex: '9',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'darkblue.main',
            zIndex: 10,
            width: '100vw',
            height: '60%',
            position: 'relative',
            top: -12,
          }}
        ></Box>
        {windowSize[0] > 600 ? (
          <Typography
            sx={{ position: 'absolute', bottom: 0, right: 0, mr: '1%', mb: '0.5%' }}
            onClick={() => openInNewTab('https://publicfiles.fcc.gov/fm-profile/wsrn-fm')}
            variant="body1"
            style={{ cursor: 'pointer' }}
          >
            FCC Pubilc File
          </Typography>
        ) : null}
      </Box>

      <Grid container justifyContent="center" alignItems="center" sx={{ display: 'flex' }}>
        <Box
          sx={{
            height: '16%',
            boxShadow: 0,
            position: 'fixed',
            bottom: { xs: 20, lg: 0 },
            backgroundColor: theme.palette.primary.main,
            borderRadius: '10px',
            zIndex: 10,
          }}
        >
          <Grid container direction="row">
            <Grid item xs={12}>
              <Loading />
            </Grid>

            {/*mobile */}
            {windowSize[0] < 600 ? (
              <Grid item xs={3}>
                {/*<PlayPauseComponent></PlayPauseComponent>*/}
              </Grid>
            ) : (
              <Grid item lg={'auto'}>
                {/*<PlayPauseComponent></PlayPauseComponent>*/}
              </Grid>
            )}
            <Grid item xs={12} lg={'auto'} sx={{ pr: 1 }}>
              <Box sx={{ color: theme.palette.darkblue.main, p: 2 }}>
                {/*<RenderPlayer />*/}
                <iframe
                  allowTransparency
                  frameBorder={0}
                  style={{ width: '100%' }}
                  src="https://admin.wsrnfm.com/public/wsrn/embed"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

//https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c-d90429

//https://stackoverflow.com/questions/67116204/possibility-to-record-playback-of-browser-audio-element-using-javascript

//https://www.npmjs.com/package/react-audio-visualize

/*

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
            borderRadius: '10px',
            zIndex: 20,
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
                <Box
                  sx={{
                    border: 1,
                    pr: 3,
                    borderRadius: 10,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
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
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>



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

*/
