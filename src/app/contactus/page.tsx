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
import { InstagramEmbed } from 'react-social-media-embed';

import Layout from '../components/layout';
import { useEffect, useState } from 'react';

export default function ContactUs() {
  const [WindowSize, setWindowSize]: any = useState({ width: 0, height: 0 });

  return (
    <Layout title="Contact Us">
      <Container></Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InstagramEmbed
          url="https://www.instagram.com/wsrn.fm/"
          style={{ maxWidth: '25vw', width: '100%' }}
        />
      </div>
    </Layout>
  );
}
