export const dynamic = 'force-dynamic'; // defaults to auto
import { NextResponse } from 'next/server';
import axios from 'axios';
import prisma from '../../../../lib/prisma';
import moment from 'moment';
import path from 'path';

import { writeFile, unlink } from 'fs/promises';

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  let req = await request.json();
  let currentYear = new Date().getFullYear();

  console.log(req);

  const result = await prisma.shows.delete({
    where: {
      id: req.id,
      title: req.title,
      dj: req.dj,
      description: req.description,
    },
  });

  try {
    unlink(path.join('/data/images/' + String(currentYear) + '/' + req.img));
    console.log('File deleted!');
  } catch (err) {
    console.log('Error occurred ', err);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }

  return NextResponse.json({ result }, { status: 200 });
}
