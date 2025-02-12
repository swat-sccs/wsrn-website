// app/api/stream/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import ICAL from 'ical.js';
const fs = require('fs');

//const icsToJson = require('ics-to-json');

let link =
  'https://calendar.google.com/calendar/ical/c_20efba3e379cb584e46776735a0ce2f147de6595b8230e2082633a065183a1c0%40group.calendar.google.com/public/basic.ics';
// To handle a GET request to /api

export async function GET(request) {
  let date = new Date();
  let data = {};
  await axios.get(link).then((res) => {
    data = res.data;
  });

  var jcalData = ICAL.parse(data);
  var comp = new ICAL.Component(jcalData);
  var vevent = comp.getAllSubcomponents('vevent');

  let output = [];
  let obj = {};

  for (var i in vevent) {
    let name = vevent[i].getFirstPropertyValue('summary');
    let desc = vevent[i].getFirstPropertyValue('description');
    let img = vevent[i].getFirstPropertyValue('attach');
    let start = vevent[i].getFirstPropertyValue('dtstart');
    let end = vevent[i].getFirstPropertyValue('dtend');

    if (start.year == date.getFullYear()) {
      //filter to current year
      if (!output.some((e) => e.Name === name)) {
        //console.log(start.year + '-' + start.month + '-' + start.day);
        let theStart = new Date(start);
        let theEnd = new Date(end);
        obj['Name'] = name;
        obj['Desc'] = desc;
        obj['Start'] = start;
        obj['End'] = end;
        obj['DOTW'] = theStart.getDay();

        //console.log(date.toLocaleString() <= theEnd.toLocaleString());

        if (
          date.getDay() == obj.DOTW &&
          date.getMinutes() - theStart.getMinutes() <= 60 &&
          date.getMinutes() - theStart.getMinutes() >= 0 &&
          date.getHours() == theStart.getHours()
        ) {
          console.log(date.getMinutes() - theStart.getMinutes());
          output.push(obj);
        }
        obj = {};
      }
    }
  }

  //var summary = vevent.getFirstPropertyValue('summary');

  return NextResponse.json(output, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
