import { NextResponse } from 'next/server';

const ADS_TXT_CONTENT = 'google.com, pub-8447027631025094, DIRECT, f08c47fec0942fa0';

export function GET() {
  return new NextResponse(ADS_TXT_CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
