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
import { InvertColors } from '@mui/icons-material';

const itemData: any = [];

export default function App() {
  const [WindowSize, setWindowSize]: any = useState({});
  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

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
                style={{ width: '11vw', height: '11vw', borderRadius: '4px' }}
              />
            ) : (
              <Box
                sx={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '9vw',
                  height: '12vw',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  borderColor: 'white',
                }}
              >
                <Image
                  style={{ borderRadius: '4px', objectPosition: 'center' }}
                  objectFit="contain"
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
    <Container sx={{ overflowX: 'clip', borderRadius: 4 }}>
      {/*{!show_data_error && !show_data_isLoading && show_data.length > 0 ? (
        <ImageList sx={{ overflowX: 'scroll' }} gap={20} cols={5} variant="quilted">
          <RenderCards></RenderCards>
        </ImageList>
      ) : null}

      <iframe
        allowTransparency
        src="https://admin.wsrnfm.com/public/wsrn/schedule/embed?theme=dark"
        frameBorder="0"
        style={{
          width: '100%',
          minHeight: '500px',
          border: '0',
        }}
      ></iframe>
       
       */}

      {WindowSize[0] > 500 ? (
        <iframe
          allowTransparency
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&mode=AGENDA&showTz=0&title=Show%20Schedule&src=Y18yMGVmYmEzZTM3OWNiNTg0ZTQ2Nzc2NzM1YTBjZTJmMTQ3ZGU2NTk1YjgyMzBlMjA4MjYzM2EwNjUxODNhMWMwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D50000"
          style={{
            border: 0,
            width: '100%',
            height: '500px',
            filter: 'invert(90%) hue-rotate(180deg) contrast(80%)',
            borderRadius: '20px',
          }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      ) : (
        <iframe
          allowTransparency
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&mode=AGENDA&showTz=0&title=Show%20Schedule&src=Y18yMGVmYmEzZTM3OWNiNTg0ZTQ2Nzc2NzM1YTBjZTJmMTQ3ZGU2NTk1YjgyMzBlMjA4MjYzM2EwNjUxODNhMWMwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D50000"
          style={{
            border: 0,
            width: '100%',
            height: '300px',
            filter: 'invert(90%) hue-rotate(180deg) contrast(80%)',
            borderRadius: '20px',
          }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      )}
    </Container>
  );
}
