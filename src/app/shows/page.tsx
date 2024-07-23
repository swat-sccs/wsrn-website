'use client';
import * as React from 'react';
import { Container, Typography, Box, Chip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import logo from '../../../img/studio_a.jpg';
import styles from './page.module.css';
import Link from 'next/link';
import moment from 'moment';
import useSWR from 'swr';

import Layout from '../components/layout';
import { useEffect, useState } from 'react';

const itemData: any = [];

export default function App() {
  const [WindowSize, setWindowSize]: any = useState({ width: 0, height: 0 });
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const {
    data: show_data,
    error: show_data_error,
    isLoading: show_data_isLoading,
  } = useSWR('/api/shows', fetcher, {
    refreshInterval: 2000,
  });

  const RenderCards = () => {
    if (!show_data_isLoading && !show_data_error) {
      let array_tosort = show_data;

      return array_tosort
        .sort(function (first: any, second: any) {
          return moment(second.startTime).diff(moment(first.startTime));
        })
        .map((item: any) => (
          <ImageListItem key={item.img} sx={{ borderRadius: 20 }}>
            <Chip
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: 'primary.main',
                color: 'darkblue.main',
                fontWeight: 'bold',
              }}
              label={moment(item.startTime).year()}
              variant="filled"
            ></Chip>
            {item.img == 'wsrn2.png' ? (
              //Default case if no image was provided by the user
              <img
                srcSet={`/img/${item.img}`}
                src={`/img/${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <Image
                fill={true}
                sizes="(max-width: 500px) 40vw, (max-width: 500px) 20vw, 20vw"
                loading={'lazy'}
                src={item.img}
                alt={item.title}
              />
            )}
            <Box
              className={styles.words}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.75)',
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '80%' }}
              >
                <Grid>
                  <Typography sx={{ p: 2, overflow: 'clip' }} variant="body1" textAlign="center">
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <ImageListItemBar
              position="below"
              sx={{ backgroundColor: '#9EB7CC', color: '#31485E' }}
              title={
                <Typography fontWeight="bold" sx={{ color: '#31485E', ml: 2 }}>
                  {item.title} - {item.dj}
                </Typography>
              }
              subtitle={
                <>
                  <Typography fontWeight={100} sx={{ color: '#31485E', ml: 2 }}>
                    {moment.weekdays(item.dotw)}
                  </Typography>
                  <Typography fontWeight={100} sx={{ color: '#31485E', ml: 2 }}>
                    {moment(item.startTime).format('LT') +
                      ' - ' +
                      moment(item.endTime).format('LT')}
                  </Typography>
                </>
              }
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                ></IconButton>
              }
            />
          </ImageListItem>
        ));
    }
  };

  return (
    <Layout title="Shows">
      <Container sx={{ height: '65vh', overflowY: 'scroll' }}>
        <ImageList sx={{ overflowY: 'scroll' }} gap={20} cols={4} variant="masonry">
          <RenderCards></RenderCards>
        </ImageList>
      </Container>
    </Layout>
  );
}
