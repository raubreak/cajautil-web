import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="10" rx="2" ry="2"/>
          <path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
          <line x1="12" y1="13" x2="12" y2="17"/>
          <line x1="10" y1="15" x2="14" y2="15"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
