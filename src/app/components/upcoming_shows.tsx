'use client';
import * as React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

import useSWR from 'swr';
import moment from 'moment';

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

  const RenderUpcomingShows = () => {
    if (!show_data_isLoading && !show_data_error) {
      let filtered_data = show_data
        .filter((show: any) => show.dotw == moment().weekday())
        .filter((show: any) => moment(show.startTime).year() == moment().year())
        .sort((a: any, b: any) => moment(a.startTime).diff(moment(b.startTime)));

      if (filtered_data.length > 0) {
        return filtered_data.map((show: any) => (
          <Box sx={{ p: 1 }} justifyContent="center">
            <Grid container justifyContent="flex-start" alignItems="center" spacing="50">
              <Grid item>
                <Typography fontWeight={'bold'} sx={{ color: '#31485E', ml: 2 }}>
                  {moment(show.startTime).format('LT')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ color: 'secondary.main' }}>
                  {' '}
                  {show.title} - {show.dj}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ));
      } else {
        return (
          <Typography sx={{ color: 'darkblue.main', textAlign: 'center' }}>
            There are currently no upcoming shows.
          </Typography>
        );
      }
    }
  };

  return (
    <Container
      sx={{ width: '100%', height: '60vh', backgroundColor: 'primary.main', borderRadius: 4 }}
    >
      <Typography
        textAlign={'center'}
        variant="h5"
        fontWeight={'bold'}
        sx={{ p: 2, color: 'darkblue.main' }}
      >
        Upcoming Shows
      </Typography>
      <RenderUpcomingShows></RenderUpcomingShows>
    </Container>
  );
}
