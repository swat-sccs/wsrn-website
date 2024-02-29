//Top Bar
'use client';
import * as React from 'react';
import { Grid, Card, CardHeader, Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Headphones } from '@mui/icons-material';
import Link from 'next/link';
import moment from 'moment';

import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Upcoming() {
  const pathname = usePathname();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const [windowSize, setWindowSize] = React.useState([]);
  const { data, error, isLoading } = useSWR('/api/states', fetcher, { refreshInterval: 1000 });
  console.log(data);
  if (!isLoading) {
    console.log(data);
  }
  const UpcomingCards = () => {
    if (!isLoading && !error && data.upcoming) {
      return data.upcoming.map((item) => (
        <>
          <Grid item>
            <Card sx={{ width: '200px', height: '150px', borderRadius: '5%' }}>
              <Typography variant="h6">{item.show}</Typography>

              <Typography variant="body1">{moment(item.time).calendar()}</Typography>
            </Card>
          </Grid>
        </>
      ));
    }
    return <></>;
  };

  return (
    <Grid
      container
      item
      direction={{ lg: 'row' }}
      justifyContent="center"
      spacing={10}
      sx={{ mt: '5%' }}
    >
      <UpcomingCards></UpcomingCards>
    </Grid>
  );
}
