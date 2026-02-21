import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface PageData {
  page: number;
  text: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'download', 'fascicule_text.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const pages: PageData[] = JSON.parse(fileContents);
    
    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Error loading fascicule data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
