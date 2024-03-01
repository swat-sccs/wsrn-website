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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import axios from 'axios';
import logo2 from '../../../img/wsrn2.png';

import { Category } from '@mui/icons-material';
//https://calendar.google.com/calendar/ical/c_cf9837abb211b7859aceeba417f7548aa7befd045fedb8b6bf4835d8c300b3e1%40group.calendar.google.com/public/basic.ics
export default function CalendarPage() {
  const [parsedData, setParsedData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handleChange = (event: any) => {
    setSearchCategory(event.target.value as string);
  };
  /*
  const RenderImage = (props: any) => {
    let test = { title: 'queen' };
    let url = '';
    let data = JSON.stringify(test);
    axios
      .post('/api/coverart', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res: any) => (url = res.data))
      .catch((err: any) => console.error(err));
  };
  */

  React.useEffect(() => {
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtsmXjeGiNZiwz42Sx46jX_o2UdH-DrdnqFs43gJRCJeSIXOleTpwzlJAzrCQhuEL4_fKQGvHkhcr6/pub?gid=332106787&single=true&output=csv',
      {
        download: true,
        header: true,
        // rest of config ...
        complete: function (results: any) {
          //console.log('Finished:', results.data);
          setParsedData(results.data);
        },
      },
    );
  }, []);

  function contains(value: string) {
    if (value.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  }

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
    if (searchCategory == 'title') {
      filterData = parsedData.filter((data: any) => contains(data['AlbumName']));
    }
    if (searchCategory == 'artist') {
      filterData = parsedData.filter((data: any) => contains(data['ArtistName']));
    }
    if (searchCategory == 'genre') {
      filterData = parsedData.filter((data: any) => contains(data['Genre']));
    }

    return filterData.map((item: any) => (
      <>
        <Grid item xs={6} lg={3}>
          <Card
            elevation={10}
            key={item['AlbumName']}
            style={{
              background: 'linear-gradient(180deg, #121212 30%,  #30475E 100%)',
              // outline: 'white solid 0.5px',
            }}
            sx={{
              minHeight: { xs: '350px', lg: '400px' },
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: { xs: '350px', lg: '400px' },
            }}
          >
            <CardContent>
              <Grid
                container
                direction="column"
                alignItems="flex-start"
                justifyContent="space-evenly"
              ></Grid>
              <Grid item>
                <div>
                  <Image
                    src={logo2}
                    width="200"
                    alt="Picture of the CD"
                    style={{ alignContent: 'center', alignItems: 'center', marginLeft: '6%' }}
                  ></Image>
                </div>
              </Grid>
              <Grid item>
                <Typography variant="h6" textAlign="center">
                  {item['AlbumName']}{' '}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body1" color="text.secondary" textAlign="center">
                  {item['ArtistName']}
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <RenderGenres genre={item['Genre']}></RenderGenres>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </>
    ));
  };

  return (
    <>
      <Grid container justifyContent="center" sx={{ mt: 2 }} direction="row">
        <Grid item xs={8} lg={2}>
          <TextField
            label="Search"
            value={search}
            onChange={(event) => handleSearch(event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3} lg={1}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select value={searchCategory} label="Age" onChange={handleChange}>
              <MenuItem value={'title'}>Title</MenuItem>
              <MenuItem value={'artist'}>Artist</MenuItem>
              <MenuItem value={'genre'}>Genre</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Container sx={{ overflowY: 'auto', height: '65vh', mt: '2%' }}>
        <Grid container direction="row" spacing={5} sx={{ mt: 0 }}>
          <RenderCards></RenderCards>
        </Grid>
      </Container>
    </>
  );
}
