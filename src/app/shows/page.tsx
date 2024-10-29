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
  } = useSWR('/api/cal', fetcher, {
    refreshInterval: 20000,
  });

  const RenderCards = () => {
    if (!show_data_isLoading && !show_data_error) {
      let sorted_data = new Array();
      for (let i = 0; i < show_data.length; i++) {
        if (show_data[i].Img != null) {
          sorted_data.push(show_data[i]);
        }
      }
      for (let i = 0; i < show_data.length; i++) {
        if (show_data[i].Img == null) {
          sorted_data.push(show_data[i]);
        }
      }

      return sorted_data.map((item: any) => (
        <ImageListItem key={item.Name} sx={{ borderRadius: 20 }}>
          <Chip
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'primary.main',
              color: 'darkblue.main',
              fontWeight: 'bold',
              zIndex: 8,
            }}
            label={item.Start.year}
            variant="filled"
          ></Chip>
          {item.Img == null ? (
            //Default case if no image was provided by the user
            <Box
              sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                overflow: 'scroll',
                borderRadius: '4px',
                borderColor: 'white',
                height: '15vw',
              }}
            >
              <Image
                style={{ borderRadius: '4px', objectPosition: 'top' }}
                objectFit="contain"
                fill
                sizes="(max-width: 1080px) 20vw, (max-width: 500px) 10vw, 15vw"
                loading={'lazy'}
                src={`wsrn2.png`}
                alt={item.title}
              />
            </Box>
          ) : (
            <Box
              sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                overflow: 'scroll',
                borderRadius: '4px',
                borderColor: 'white',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '90%',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  objectPosition: 'top',
                }}
                //objectFit="contain"
                //fill
                //sizes="(max-width: 1000px) 80vw, (max-width: 1000px) 20vw, 15vw"
                //loading={'lazy'}
                src={item.Img}
                alt={item.Name}
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
              overflow: 'scroll',
              zIndex: 10,

              backgroundColor: 'rgba(0,0,0,0.85)',
            }}
          >
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid>
                <Typography
                  sx={{ p: 2, maxWidth: '100%', overflow: 'auto' }}
                  variant="body1"
                  textAlign="center"
                >
                  {item.Desc}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <ImageListItemBar
            position="below"
            sx={{ backgroundColor: '#9EB7CC', color: '#31485E' }}
            title={
              <Typography
                fontWeight="bold"
                sx={{ color: '#31485E', p: 1, whiteSpace: 'initial' }}
                textAlign="center"
              >
                {item.Name}
              </Typography>
            }
          />
        </ImageListItem>
      ));
    }
  };

  return (
    <Layout title="Shows">
      <Container sx={{ height: '65vh', overflowY: 'scroll' }}>
        <ImageList sx={{ overflowY: 'scroll' }} gap={20} cols={5} variant="masonry">
          <RenderCards></RenderCards>
        </ImageList>
      </Container>
    </Layout>
  );
}
