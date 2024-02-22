//Top Bar
'use client';
import * as React from 'react';
import { Grid, Tab, Tabs, Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Headphones } from '@mui/icons-material';
import Link from 'next/link';

import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Header() {
  const pathname = usePathname();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const [windowSize, setWindowSize] = React.useState([]);
  const [ShowSmallListeners, setShowSmallListeners] = React.useState(false);
  //const [data, setData] = React.useState(null);
  const { data, error, isLoading } = useSWR('/api/stream', fetcher, { refreshInterval: 5000 });
  //const data = [];
  const handleChange = (event, newValue) => {
    setValue(event);
  };

  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 500) {
      console.log('Test');
      setShowSmallListeners(true);
    } else {
      setShowSmallListeners(false);
    }
  }, []);

  const RenderListeners = () => {
    if (data && value == '/' && !error) {
      return (
        <>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={1}>
              <Headphones sx={{ height: 25, width: 25 }}></Headphones>
            </Grid>

            <Grid item xs={1}>
              <Typography variant="h6">{data.source.listeners}</Typography>
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return (
    <Container sx={{ mt: 1 }}>
      <Grid
        container
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent="flex-start"
        spacing={0}
      >
        <Grid item xs={1} lg={1}>
          <Box sx={{}}></Box>
        </Grid>

        <Grid item xs={10}>
          <Tabs value={value} aria-label="Navigation Tabs" centered>
            <Link href="/" passHref style={{ color: 'white' }} onClick={() => handleChange(0)}>
              <Tab value="0" label="Listen" />
            </Link>
            <Link
              href="/schedule"
              passHref
              style={{ color: 'white' }}
              onClick={() => handleChange(1)}
            >
              <Tab value="1" label="Schedule" />
            </Link>
            <Link
              href="/about_us"
              passHref
              style={{ color: 'white' }}
              onClick={() => handleChange(2)}
            >
              <Tab value="2" label="About us" />
            </Link>
          </Tabs>
        </Grid>
      </Grid>
    </Container>
  );
}
