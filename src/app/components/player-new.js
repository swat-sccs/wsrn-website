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
  Button,
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

  const [windowSize, setWindowSize] = React.useState([]);
  const [bottomHeight, setBottomHeight] = React.useState('8vh');
  const [_analyser, set_analyser] = React.useState(null);

  const {
    data: nowPlaying,
    error: error,
    isLoading: nowPlaying_isLoading,
  } = useSWR('/api/now_playing', fetcher, { refreshInterval: 4000 });

  const {
    data: currentShow,
    error: currentShow_error,
    isLoading: currentShow_isLoading,
  } = useSWR('/api/check_current_show', fetcher, { refreshInterval: 4000 });

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const RenderCurrentShow = () => {
    if (!currentShow_isLoading && !nowPlaying_isLoading) {
      if (currentShow.length > 0 && nowPlaying.live.is_live) {
        return (
          <>
            <Button
              sx={{ color: 'black', cursor: 'default' }}
              variant="text"
              startIcon={<Sensors sx={{ height: 20, width: 20, color: 'red' }} />}
              endIcon={
                <>
                  <Headphones sx={{ height: 20, width: 20 }} /> {nowPlaying?.listeners.total}
                </>
              }
            >
              {currentShow[0].Name}
            </Button>
          </>
        );
      }
    }
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
            height: { lg: '60%', xs: '15vh' },
            position: 'relative',
            top: { xs: -65, lg: -12 },
          }}
        ></Box>
        {windowSize[0] > 600 ? (
          <>
            <Typography
              sx={{ position: 'absolute', bottom: 0, right: 0, mr: '1%', mb: '0.5%' }}
              onClick={() => openInNewTab('https://publicfiles.fcc.gov/fm-profile/wsrn-fm')}
              variant="body1"
              style={{ cursor: 'pointer' }}
            >
              FCC Pubilc File
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                bottom: 2,
                left: 10,
                overflowX: 'clip',
                width: '40vw',
              }}
            >
              <RenderCurrentShow></RenderCurrentShow>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 2,
                overflowX: 'clip',
              }}
            >
              <RenderCurrentShow></RenderCurrentShow>
            </Box>
          </>
        )}
      </Box>

      <Grid container justifyContent="center" alignItems="center" sx={{ display: 'flex' }}>
        <Box
          sx={{
            height: '16%',
            boxShadow: 0,
            position: 'fixed',
            bottom: { xs: 80, lg: 0 },
            backgroundColor: theme.palette.primary.main,
            borderRadius: '10px',
            zIndex: '10',
          }}
        >
          <Grid container direction="row">
            {/*mobile */}
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
