export const dynamic = 'force-dynamic'; // defaults to auto
import { NextResponse } from 'next/server';
import axios from 'axios';
import prisma from '../../../../lib/prisma';
import moment from 'moment';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';

export async function GET(request) {
  const result = await prisma.shows.findMany();

  return NextResponse.json(result);
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  let req = await request.json();
  console.log(req);
  const result = await prisma.shows.create({
    data: {
      title: req.title,
      img: req.img.replaceAll(' ', '_'),
      dj: req.dj,
      startTime: req.startTime,
      endTime: req.endTime,
      dotw: req.dotw,
      description: req.description,
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}

// To handle a POST request to /api
export async function PUT(request) {
  // Do whatever you want
  let req = await request.json();
  console.log(req);

  const result = await prisma.shows.update({
    where: {
      id: req.OGRow.id,
      title: req.OGRow.title,
      dj: req.OGRow.dj,
      description: req.OGRow.description,
    },
    data: {
      title: req.updatedRow.title,
      img: req.updatedRow.img.replaceAll(' ', '_'),
      dj: req.updatedRow.dj,
      startTime: req.updatedRow.startTime,
      endTime: req.updatedRow.endTime,
      dotw: Numbers(req.updatedRow.dotw),
      description: req.updatedRow.description,
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}

export async function DELETE(request) {
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
    unlink(path.join(process.cwd(), '/images/' + String(currentYear) + '/' + req.img));
    console.log('File deleted!');
  } catch (err) {
    console.log('Error occurred ', err);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }

  return NextResponse.json({ result }, { status: 200 });
}
