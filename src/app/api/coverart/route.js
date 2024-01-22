// app/api/stream/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

//https://musicbrainz.org/ws/2/release/?query=name:Gentlemen&limit=2
//https://coverartarchive.org/release/7516fc6e-f1d0-48fa-94c3-f3e8fb0b0692/
//images/large
export async function POST(request) {
  const data = await request.json();
  let response;
  let response2;
  let title = data.title.replace(' ', '-');
  let link = 'https://musicbrainz.org/ws/2/release/?query=name:' + title + '&limit=1&fmt=json';
  await axios.get(link).then((res) => {
    response = res.data;
  });

  let mbid = response['releases'][0]['id'];
  let link2 = 'https://coverartarchive.org/release/' + mbid;
  await axios.get(link2).then((res) => {
    response2 = res.data;
  });

  let output = response2['images'][0]['image'];

  return NextResponse.json(output, { status: 200 });
}

// To handle a POST request to /api
export async function GET(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
