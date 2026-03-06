import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // 1. Redirección SEO 301 desde dominio Vercel hacia el dominio principal
  if (hostname === 'cajautil-web.vercel.app') {
    return NextResponse.redirect(`https://cajautil.com${url.pathname}${url.search}`, 301);
  }

  // 2. Protección Auth para el Panel SEO
  if (url.pathname.startsWith('/revision-seo')) {
    const basicAuth = req.headers.get('authorization');

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

  return NextResponse.next();
}
