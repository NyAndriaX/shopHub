import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const middleware = createMiddleware(routing);

export default function middlewareHandler(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    const locale = routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return middleware(req);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*'],
};
