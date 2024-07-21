import { NextResponse } from 'next/server';
import axios from 'axios';

let link = process.env.IP;

//Get states from IMAC running the readio stream. Live/recording state, current song - artist

export async function GET(request) {
  let data = {};
  await axios
    .get(link, {
      headers: {
        'X-API-Key': process.env.KEY, //the token is a variable which holds the token
        // ah yes very good stackoverflow comment
      },
    })
    .then((res) => {
      data = res.data;
    });

  return NextResponse.json(data);
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
