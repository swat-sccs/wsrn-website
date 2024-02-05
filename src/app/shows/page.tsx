import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import logo from '../../../img/studio_a.jpg';
import styles from './page.module.css';

import wsrn from '../../../public/img/www.jpg';

const itemData = [
  {
    img: '/img/www.jpg',
    title: 'WSRN',
    author: 'Damian Rene',
    rows: 2,
    cols: 2,
    featured: true,
    description: 'This is a radio show that does things on the radio. (prob music or something)',
  },
  {
    img: '/img/swatswim.jpg',
    title: 'WSRN',
    author: 'Damian Rene',
    rows: 2,
    cols: 2,
    featured: true,
    description: 'This is a radio show that does things on the radio. (prob music or something)',
  },
];

export default function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Box sx={{ overflowY: 'scroll', width: '80vw', height: '77vh' }}>
          <ImageList cols={4} gap={20}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <Image
                      src={`${item.img}`}
                      alt={item.title}
                      width={250}
                      height={350}
                      objectFit="contain"
                    ></Image>

                    <Box
                      className={styles.words}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                      }}
                    >
                      <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                          mt: '50%',
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>

                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                          aria-label={`info about ${item.title}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </Grid>
                </Grid>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </Grid>
  );
}
