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
  let output = [];

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

    dates.forEach((date) => {
      let newDate;
      if (event.rrule.origOptions.tzid) {
        // tzid present (calculate offset from recurrence start)
        const dateTimezone = moment.tz.zone('UTC');
        const localTimezone = moment.tz.guess();
        const tz =
          event.rrule.origOptions.tzid === localTimezone
            ? event.rrule.origOptions.tzid
            : localTimezone;
        const timezone = moment.tz.zone(tz);
        const offset = timezone.utcOffset(date) - dateTimezone.utcOffset(date);
        newDate = moment(date).add(offset, 'minutes').toDate();

        test.push({ Show: event.summary, Start: date });
      } else {
        // tzid not present (calculate offset from original start)
        newDate = new Date(
          date.setHours(
            date.getHours() - (event.start.getTimezoneOffset() - date.getTimezoneOffset()) / 60,
          ),
        );
      }

      const start = moment(newDate);
      //test.push({ Event: event.summary, OG_Start: event.start, RecurrenceS: start });
    });
  }
  //console.log(JSON.stringify(test, null, ' '));

  for (let thing of test) {
    var beginningTime = moment(thing.Start);
    var endTime = moment();
    let now = moment();

    if (thing.Show == 'bum review') {
      console.log(moment(thing.Start));
      //console.log(thing.Show, now.diff(thing.Start, 'days', true));
      //console.log(now.diff(beginningTime, 'hours', true));
    }

    if (
      now.diff(beginningTime, 'hours', true) >= -1 &&
      now.diff(beginningTime, 'hours', true) <= 0
    ) {
      output = {
        Show: thing.Show.toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' '),
      };
      break;
    } else {
      output = { Show: 'NA' };
    }
  }

  return NextResponse.json(output, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  console.log(request);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
