// app/api/stream/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  var nowPlaying;

  await axios
    .get('https://admin.wsrnfm.com/api/nowplaying/wsrn')
    .then((response) => {
      // Do something with the Now Playing data.
      nowPlaying = response.data;
      return NextResponse.json(nowPlaying, { status: 200 });
    })
    .catch((error) => {
      console.error(error);
    });

  return NextResponse.json(nowPlaying, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
