import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/revision-seo/:path*'],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.ADMIN_USER || 'raubreak@gmail.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'CajaUtilSEO*2026';

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Autenticación requerida para acceder al Panel SEO.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Panel Seguro CajaUtil"',
    },
  });
}
