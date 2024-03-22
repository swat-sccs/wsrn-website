'use client';
import Calendar from '../components/cal.js';
import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Grid,
  Card,
  Typography,
  Container,
  CardContent,
  CardMedia,
  Button,
  CardHeader,
  InputLabel,
  FormControl,
  Box,
  Divider,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import path from 'path';
import logo2 from '../../../img/wsrn2.png';
import styles from './page.module.css';

import { Category } from '@mui/icons-material';
import { arch } from 'os';
//https://calendar.google.com/calendar/ical/c_cf9837abb211b7859aceeba417f7548aa7befd045fedb8b6bf4835d8c300b3e1%40group.calendar.google.com/public/basic.ics
export default function CalendarPage() {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const [parsedData, setParsedData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [selectedSeason, setSelectedSeason] = useState('18-fall');
  const [selectedShow, setSelectedShow] = useState('');
  const [data, setData] = useState<any>();
  const [playing, setPlaying] = useState<any>(false);
  const [windowSize, setWindowSize] = useState<any>([]);
  const [shows, setShows] = React.useState('');
  const [select_open, set_select_open] = React.useState(true);
  const [selectedYear, setSelectedYear] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedShow(event.target.value);
  };
  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const [opens, setOpens] = React.useState<any>([]);
  const pre = '';
  const {
    data: archive_data,
    error: archive_error,
    isLoading: archive_isLoading,
  } = useSWR('/api/archive', fetcher, {
    refreshInterval: 2000,
  });
  React.useEffect(() => {
    console.log(window.innerWidth);
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  React.useEffect(() => {
    setData(require('public/list.json'));
  }, []);

  const RenderGenres = (props: any) => {
    let thing = props.genre.split(',');
    return thing.map((item: any) => (
      <>
        <Grid item>
          <Chip label={item}></Chip>
        </Grid>
      </>
    ));
  };

  const RenderCards = () => {
    let cards = [];
    let filterData: any = [];
    //console.log(data);

    const obj = Object.assign([], data);
    let temp: any = [];
    if (!archive_isLoading && !archive_error) {
      Object.keys(archive_data).forEach(function (key, index) {
        temp.push(
          <Grid item key={key}>
            <Button
              fullWidth
              onClick={() => {
                setSelectedSeason(key);
                setSelectedShow('');
              }}
              variant="contained"
              color={selectedSeason == key ? 'secondary' : 'primary'}
            >
              <Typography variant="h5">{key}</Typography>
            </Button>
          </Grid>,
        );
      });
    }
    return temp;
  };

  const RenderAudioFiles = (props: any) => {
    let temp: any = [];
    let season = props.season;
    if (!archive_isLoading && !archive_error && selectedShow) {
      archive_data[selectedSeason][selectedShow].map((item: any) =>
        temp.push(
          <>
            <Divider></Divider>
            <ListItem key={item} sx={{ background: 'rgba(255,255,255,0.1)', mb: '2%' }}>
              <Grid container justifyContent="space-evenly" direction="row">
                <Grid item xs={12} lg={6} sx={{ mt: 'auto', mb: 'auto' }}>
                  <Typography variant="body1">{item}</Typography>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <audio controls title={item}>
                    <source
                      src={decodeURI(path.join('/archive/', selectedSeason, selectedShow, item))}
                    />
                  </audio>
                </Grid>
              </Grid>
            </ListItem>
          </>,
        ),
      );
    }

    return temp;
  };

  const RenderShows = (props: any) => {
    let temp: any = [];
    let season = props.season;

    if (!archive_isLoading && !archive_error) {
      for (const show in archive_data[season]) {
        temp.push(
          <>
            <ListItemButton
              key={show}
              onClick={() => setSelectedShow(show)}
              sx={{
                background: selectedShow == show ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0)',
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={show} />
            </ListItemButton>

            <Divider></Divider>
          </>,
        );
      }
    }
    return temp;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3">Archives</Typography>

      {windowSize[0] < 600 ? (
        //Mobile
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={2}
          alignItems="flex-start"
          sx={{ mt: '2%' }}
        >
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>

              <Select
                labelId="Year"
                id="Year"
                value={selectedYear}
                label="Shows"
                onChange={handleYearChange}
              >
                {!archive_isLoading
                  ? Object.entries(archive_data).map(([key, value]) => [
                      <MenuItem value={key}>{key}</MenuItem>,
                    ])
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Shows</InputLabel>

              <Select value={selectedShow} label="Shows" onChange={handleChange}>
                {!archive_isLoading
                  ? Object.entries(archive_data[selectedSeason]).map(([key, value]) => [
                      <MenuItem value={key}>{key}</MenuItem>,
                    ])
                  : null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={6}>
            <List sx={{ overflowY: 'auto', height: '40vh', width: '100%' }}>
              <RenderAudioFiles></RenderAudioFiles>
            </List>
          </Grid>
        </Grid>
      ) : (
        //laptop
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          alignItems="flex-start"
          sx={{ mt: '2%' }}
        >
          <Grid item lg={2}>
            <RenderCards></RenderCards>
          </Grid>
          <Grid item lg={4}>
            <List sx={{ overflowY: 'auto', height: '70vh' }}>
              <RenderShows season={selectedSeason}></RenderShows>
            </List>
          </Grid>

          <Grid item lg={6}>
            <List sx={{ overflowY: 'auto', height: '70vh', width: '100%' }}>
              <RenderAudioFiles></RenderAudioFiles>
            </List>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
