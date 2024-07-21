'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Auth from '@/app/components/auth';

function ResponsiveAppBar(props: any) {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ width: '40vw', height: '40vh', mt: 10 }}>
          <Grid container direction="row" justifyContent={'center'} alignItems="center">
            <Grid item sx={{ mt: '20%' }}>
              <Auth></Auth>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
export default ResponsiveAppBar;
