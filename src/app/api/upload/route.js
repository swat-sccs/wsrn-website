// Import necessary modules
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export const POST = async (req, res) => {
  const formData = await req.formData();
  //let currentYear = new Date().getFullYear();
  let currentYear = formData.get('year');
  const file = formData.get('file');

  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = file.name.replaceAll(' ', '_');

  try {
    await writeFile(path.join(process.cwd(), '/data/images/' + filename), buffer);

    return NextResponse.json({ Message: 'Success', status: 201 });
  } catch (error) {
    console.log('Error occurred ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
