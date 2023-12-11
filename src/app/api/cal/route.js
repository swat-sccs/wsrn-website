// app/api/cal/route.js
import { NextResponse } from 'next/server';
import icsToJson from 'ics-to-json';
import ical from 'node-ical';
//const icsToJson = require('ics-to-json');

let link =
  'https://calendar.google.com/calendar/ical/c_cf9837abb211b7859aceeba417f7548aa7befd045fedb8b6bf4835d8c300b3e1%40group.calendar.google.com/public/basic.ics';
// To handle a GET request to /api

export async function GET(request) {
  console.log(request);
  let thedata = [];
  ical.async.fromURL(link, function (err, data) {
    thedata = data;
  });

  const icsRes = await fetch(link);
  const icsData = await icsRes.text();

  // Convert
  const data = icsToJson(icsData);
  let realData = [];

  for (let thing of data) {
    let startDate = new Date(
      parseInt(thing['startDate'].substr(0, 4)),
      parseInt(thing['startDate'].substr(4, 2)) - 1,
      parseInt(thing['startDate'].substr(6, 2)),
      parseInt(thing['startDate'].substr(9, 2)) - 4,
    );
    let endDate = new Date(
      parseInt(thing['startDate'].substr(0, 4)),
      parseInt(thing['startDate'].substr(4, 2)) - 1,
      parseInt(thing['startDate'].substr(6, 2)),
    );

    if (thing['description']) {
      realData.push({
        start: startDate,
        end: endDate,
        title: thing['summary'],
        description: thing['description'],
      });
    } else {
      realData.push({
        start: startDate,
        end: endDate,
        title: thing['summary'],
      });
    }
  }

  return NextResponse.json(realData, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
