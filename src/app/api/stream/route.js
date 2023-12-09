// app/api/stream/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

//const icsToJson = require('ics-to-json');

let link = 'https://stream.wsrnfm.com/status-json.xsl';
// To handle a GET request to /api

export async function GET(request) {
  console.log(request);
  let data = {};
  await axios.get(link).then((res) => {
    data = res.data;
  });

  return NextResponse.json(data['icestats'], { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
