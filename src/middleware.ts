import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { cookies, url } = request;
  const access_token = cookies.get('access_token');

  if (!access_token && !url.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (access_token && url.includes('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
