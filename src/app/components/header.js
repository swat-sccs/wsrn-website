//Top Bar
'use client';
import * as React from 'react';
import { Grid, Tab, Tabs, Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Headphones } from '@mui/icons-material';

import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Header() {
  const pathname = usePathname();
  const [value, setValue] = React.useState(pathname);
  const router = useRouter();
  //const [data, setData] = React.useState(null);
  const { data, error, isLoading } = useSWR('/api/stream', fetcher, { refreshInterval: 5000 });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const RenderListeners = () => {
    if (data && value == '/') {
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
      <Grid container justifyContent="flex-start" spacing={0}>
        <Grid item xs={1}>
          <Box sx={{ mt: 2 }}>
            <RenderListeners />
          </Box>
        </Grid>

        <Grid item xs={10}>
          <Tabs value={value} onChange={handleChange} aria-label="Navigation Tabs" centered>
            <Tab value="/" label="Listen" onClick={() => router.push('/')} />
            <Tab value="/schedule" label="Schedule" onClick={() => router.push('/schedule')} />
            <Tab value="/about_us" label="About us" onClick={() => router.push('/about_us')} />
          </Tabs>
        </Grid>

        <Grid item xs={1}>
          <Box sx={{}}></Box>
        </Grid>
      </Grid>
    </Container>
  );
}
