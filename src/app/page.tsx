import * as React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Russo One"></link>
      <Container>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          <Typography
            style={{ fontFamily: 'Russo One', color: '#EDF2F4' }}
            variant="h1"
            sx={{ mt: '5%' }}
          >
            WSRN
          </Typography>

          <Typography style={{ fontFamily: 'Russo One', color: '#EDF2F4' }} variant="body1">
            Worldwide · Swarthmore · Radio · Network
          </Typography>
          <Typography variant="body1" sx={{ mt: '2%' }}></Typography>
        </Grid>
      </Container>
    </div>
  );
}
