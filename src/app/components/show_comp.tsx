'use client';
import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
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
import { SystemSecurityUpdate } from '@mui/icons-material';

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
      console.log(moment().year());
      let filtered_data = show_data
        .filter((item: any) => moment(item.startTime).year() == moment().year())
        .sort(function (first: any, second: any) {
          return first.title.localeCompare(second.title);
        });
      return filtered_data.map((item: any) => (
        <Link href="/shows" style={{ textDecoration: 'none', color: '#EDF2F4' }}>
          <ImageListItem key={item.img} sx={{ borderRadius: 20 }}>
            {item.img == 'wsrn2.png' ? (
              //Default case if no image was provided by the user
              <img
                srcSet={`/img/${item.img}`}
                src={`/img/${item.img}`}
                alt={item.title}
                loading="lazy"
                style={{ objectFit: 'cover', width: '150px', height: '150px', borderRadius: '4px' }}
              />
            ) : (
              <img
                //local:///2024/test_123.jpeg
                //btoa('local:///' + moment(first.startTime).year() + first.img)
                //'http://localhost:5240/insecure/plain/' +'local:///' +moment(item.startTime).year() +'/' +item.img
                src={`http://images.local:5240/sig/${btoa(
                  'local:///' + moment(item.startTime).year() + '/' + item.img,
                )}`}
                alt={item.title}
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px',
                  borderRadius: '4px',
                }}
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
                  <Typography sx={{ p: 2, overflow: 'clip' }} variant="body2" textAlign="center">
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <ImageListItemBar
              position="below"
              sx={{ backgroundColor: '#9EB7CC', color: '#31485E' }}
              title={
                <Typography
                  variant="body1"
                  textAlign="center"
                  fontWeight="bold"
                  sx={{ color: '#31485E' }}
                >
                  {item.title} - {item.dj}
                </Typography>
              }
            />
          </ImageListItem>
        </Link>
      ));
    }
  };

  return (
    <Container sx={{ overflowX: 'scroll', backgroundColor: 'primary.main', borderRadius: 4 }}>
      {!show_data_error && !show_data_isLoading ? (
        <ImageList sx={{ overflowX: 'scroll' }} gap={20} cols={show_data.length} variant="quilted">
          <RenderCards></RenderCards>
        </ImageList>
      ) : null}
    </Container>
  );
}
