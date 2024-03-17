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
  TextField,
  InputAdornment,
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
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import path from 'path';
import logo2 from '../../../img/wsrn2.png';

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
          <ListItem key={item} sx={{ background: 'rgba(255,255,255,0.2)' }}>
            <Typography variant="body2">{item}</Typography>
            <audio controls title={item}>
              <source src={decodeURI(path.join('/archive/', selectedSeason, selectedShow, item))} />
            </audio>
          </ListItem>,
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
          <ListItem key={show}>
            <ListItemButton
              onClick={() => setSelectedShow(show)}
              sx={{ background: selectedShow == show ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0)' }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={show} />
            </ListItemButton>
          </ListItem>,
        );
      }
    }

    return temp;
  };

  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ ml: '2%', width: '98%', mt: '2%' }}
      >
        <Grid container justifyContent="space-evenly">
          <RenderCards></RenderCards>
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: '2%' }}>
          <Grid item xs={4}>
            <List sx={{ overflowY: 'auto', height: '70vh' }}>
              <RenderShows season={selectedSeason}></RenderShows>
            </List>
          </Grid>
          <Grid item>
            <Divider orientation="vertical"></Divider>
          </Grid>
          <Grid item xs={4}>
            <List sx={{ overflowY: 'auto', height: '70vh' }}>
              <RenderAudioFiles></RenderAudioFiles>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
