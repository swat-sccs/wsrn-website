'use client';

//Displays title and links at the top of each page
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import Link from 'next/link';

// If it breaks lol find me on github @DCRepublic

const Layout = ({ title, children }) => (
  <div>
    <Container sx={{ mb: 2 }}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid container item xs={12}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems={'flex-start'}
          >
            <Grid container item xs={12} sm={6} alignItems={'flex-start'}>
              <Grid
                container
                direction="row"
                justifyContent={{ xs: 'center', lg: 'space-evenly' }}
                spacing={{ sm: '1', lg: '8' }}
              >
                <Grid item lg={'auto'} sm={'auto'}>
                  <Link href="/" passHref style={{ textDecoration: 'none', color: '#EDF2F4' }}>
                    <Typography style={{}} variant="h1">
                      WSRN
                    </Typography>
                  </Link>
                </Grid>

                <Grid item lg={'auto'} sx={{ mt: 3 }}>
                  <Typography style={{}} variant="h3">
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mt: '5%' }} justifyContent="flex-end">
              <Grid
                container
                direction="row"
                spacing={5}
                justifyContent={{ xs: 'center', lg: 'flex-end' }}
              >
                <Grid item>
                  <Link href="/archives" passHref style={{ textDecoration: 'none' }}>
                    <Typography variant="h5" color="white">
                      Archives
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/shows" passHref style={{ textDecoration: 'none' }}>
                    <Typography variant="h5" color="white">
                      Shows
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={{ xs: 'center', lg: 'space-between' }} item>
          <Typography style={{}} variant="body1" sx={{ mb: -1 }} mt={{ xs: 2, lg: 0 }}>
            Worldwide · Swarthmore · Radio · Network
          </Typography>
        </Grid>
      </Grid>
    </Container>
    {children}
  </div>
);

export default Layout;
