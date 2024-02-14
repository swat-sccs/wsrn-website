// app/api/cal/route.js
import { NextResponse } from 'next/server';
import icsToJson from 'ics-to-json';
import ical from 'node-ical';
const moment = require('moment-timezone');

//const icsToJson = require('ics-to-json');

let link =
  'https://calendar.google.com/calendar/ical/c_cf9837abb211b7859aceeba417f7548aa7befd045fedb8b6bf4835d8c300b3e1%40group.calendar.google.com/public/basic.ics';
// To handle a GET request to /api

export async function GET(request) {
  let test = [];
  let output = {};
  let realOutput = [];

  const data = await ical.async.fromURL(link);

  for (let k in data) {
    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
    const event = data[k];
    if (event.type !== 'VEVENT' || !event.rrule) continue;

    const dates = event.rrule.between(
      new Date(moment().year(), 0, 1, 0, 0, 0, 0),
      new Date(moment().year() + 1, 11, 31, 23, 59, 0, 0),
    );
    if (dates.length === 0) continue;

    for (let show in dates) {
      if (moment().diff(show, 'hours', true) > 0 && moment().diff(show, 'hours', true) < 1) {
        console.log(moment().diff(show, 'hours', true));
      }

      if (
        moment().diff(moment(show), 'hours', true) < 0 &&
        moment().diff(moment(show), 'hours', true) > -5
      ) {
        console.log(event.summary);
        console.log(moment().diff(show, 'hours', true));
        realOutput.push({ Show: event.summary });
      }
    }
    let summary = event.summary;
    output[summary] = dates;
  }

  if (realOutput == []) {
    realOutput.push({ Show: 'NA' });
  }

  return NextResponse.json(realOutput, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
