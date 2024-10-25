// app/api/stream/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import ICAL from 'ical.js';
const fs = require('fs');
import path from 'path';

//const icsToJson = require('ics-to-json');

let link =
  'https://calendar.google.com/calendar/ical/c_20efba3e379cb584e46776735a0ce2f147de6595b8230e2082633a065183a1c0%40group.calendar.google.com/public/basic.ics';
// To handle a GET request to /api
const downloadImage = async (url, filepath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading the image:', error);
  }
};

export async function GET(request) {
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
    if (!output.some((e) => e.Name === name)) {
      obj['Name'] = name;
      obj['Desc'] = desc;
      if (img != null) {
        obj['Img'] = img
          .replace('https://drive.google.com/open?id=', 'https://lh3.googleusercontent.com/d/')
          .replace('/view', '');
        let currentYear = new Date().getFullYear();
        const filename = currentYear + '_' + name.replaceAll(' ', '_');
        const savePath = path.join(process.cwd() + '/data/images/' + filename + '.jpg');
        if (!fs.existsSync(savePath)) {
          downloadImage(obj['Img'], savePath).then(() => {
            console.log('Image downloaded successfully!');
          });
        }
      }

      obj['Start'] = start;
      obj['End'] = end;
      output.push(obj);
      obj = {};
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
