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

import wsrn from '../../../public/img/www.jpg';

const itemData = [
  {
    img: '/img/www.jpg',
    title: 'WSRN',
    author: 'Damian Rene',
    rows: 2,
    cols: 2,
    featured: true,
  },
];

export default function App() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Box sx={{ overflowY: 'scroll', width: '80vw', height: '77vh' }}>
          <ImageList variant="woven" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <Image
                  src={`${item.img}`}
                  alt={item.title}
                  width={400}
                  height={600}
                  objectFit="contain"
                />

                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </Grid>
  );
}
