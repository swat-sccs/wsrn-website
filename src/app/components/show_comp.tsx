'use client';
import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from './page.module.css';
import Link from 'next/link';
import moment from 'moment';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
                style={{ objectFit: 'cover', width: '11vw', height: '11vw', borderRadius: '4px' }}
              />
            ) : (
              <Box
                sx={{ width: '11vw', minHeight: '11vw', overflow: 'hidden', borderRadius: '4px' }}
              >
                <Image
                  style={{ borderRadius: '4px' }}
                  objectFit={'cover'}
                  fill
                  sizes="(max-width: 1000px) 80vw, (max-width: 1000px) 20vw, 15vw"
                  loading={'lazy'}
                  src={item.img}
                  alt={item.title}
                />
              </Box>
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
