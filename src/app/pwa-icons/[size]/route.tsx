import { ImageResponse } from 'next/og';

const SUPPORTED_SIZES = new Set([192, 512]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size: rawSize } = await params;
  const size = Number(rawSize);

  if (!SUPPORTED_SIZES.has(size)) {
    return new Response('Not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#eff6ff',
          color: '#0369a1',
          display: 'flex',
          fontSize: size * 0.34,
          fontWeight: 800,
          height: '100%',
          justifyContent: 'center',
          letterSpacing: '-0.08em',
          width: '100%',
        }}
      >
        CU
      </div>
    ),
    { width: size, height: size },
  );
}
