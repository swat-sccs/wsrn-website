'use client';
import * as React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

import useSWR from 'swr';
import moment from 'moment';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { SystemSecurityUpdate } from '@mui/icons-material';

const itemData: any = [];

export default function UpcomingShows() {
  const [WindowSize, setWindowSize]: any = useState({ width: 0, height: 0 });
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const {
    data: show_data,
    error: show_data_error,
    isLoading: show_data_isLoading,
  } = useSWR('/api/shows', fetcher, {});

  // Need to check switch state and schedule. just doing the second for now
  const RenderNowPlaying = () => {
    if (!show_data_isLoading && !show_data_error) {
      let filtered_data = show_data
        .filter((show: any) => show.dotw == moment().weekday())
        .filter((show: any) => moment(show.startTime).year() == moment().year())
        .sort((a: any, b: any) => moment(a.startTime).diff(moment(b.startTime)));
      console.log(filtered_data);

      if (filtered_data.length > 0) {
        for (let x = 0; x < filtered_data.length; x++) {
          console.log(moment().isAfter(filtered_data[0].starTime));

          if (
            moment().diff(filtered_data[0].startTime, 'minutes') > 0 &&
            moment().isBefore(filtered_data[0].endTime)
          ) {
            return (
              <>
                <Grid
                  container
                  direction={'row'}
                  justifyContent={'space-evenly'}
                  alignItems="center"
                  sx={{ mb: '5%' }}
                >
                  <Grid item>
                    <Box
                      sx={{
                        position: 'relative',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '10vh',
                        height: '10vh',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        borderColor: 'white',
                        backgroundColor: 'white',
                      }}
                    >
                      <Image
                        style={{ borderRadius: '4px', objectPosition: 'center' }}
                        objectFit="contain"
                        fill
                        sizes="(max-width: 1000px) 80vw, (max-width: 1000px) 20vw, 15vw"
                        loading={'lazy'}
                        src={filtered_data[0].img}
                        alt={filtered_data[0].title}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{ color: 'darkblue.main', textAlign: 'center', fontSize: '1.7em' }}
                    >
                      {filtered_data[0].title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ color: 'darkblue.main', textAlign: 'center' }}>
                      {filtered_data[0].title}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            );
          }
        }
      } else {
        return (
          <Typography sx={{ color: 'darkblue.main', textAlign: 'center', mb: 5 }}>
            Nothing here for now. Just sweet archive tunes.
          </Typography>
        );
      }
    } else {
      return (
        <Typography sx={{ color: 'darkblue.main', textAlign: 'center' }}>
          Nothing here for now. Just sweet archive tunes.
        </Typography>
      );
    }
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 4,
          height: '23vh',
        }}
      >
        <Typography variant="h5" sx={{ color: 'darkblue.main', textAlign: 'center', mt: 2 }}>
          Recently Played
        </Typography>

        <Box sx={{ height: 140, overflowY: 'scroll' }}>
          <iframe
            allowTransparency
            frameBorder={0}
            scrolling="no"
            style={{
              width: '100%',
              height: '100vh',
              overflowY: 'auto',
              padding: 6,
            }}
            src="https://admin.wsrnfm.com/public/wsrn/history?theme=dark"
          ></iframe>
        </Box>
      </Container>
    </>
  );
}
