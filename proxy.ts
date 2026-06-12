import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { parse } from 'cookie';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

const refreshSession = async (cookieHeader: string) => {
  return axios.get(`${process.env.NOTEHUB_API_URL}/auth/session`, {
    headers: {
      Cookie: cookieHeader,
      Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
      Accept: 'application/json',
    },
    withCredentials: true,
  });
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      const apiRes = await refreshSession(request.headers.get('cookie') ?? '');

      const setCookie = apiRes.headers['set-cookie'];

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path ?? '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            httpOnly: true,
            sameSite: 'lax' as const,
            secure: process.env.NODE_ENV === 'production',
          };

          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, options);
          }
        }

        return response;
      }
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
