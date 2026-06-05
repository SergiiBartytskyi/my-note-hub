import { ApiError, serverAPI } from '@/lib/services/serverAPI';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { getStatusMessage } from '@/utils/getStatusMessage';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await serverAPI.post('auth/register', body);
    const cookieStore = await cookies();
    const setCookies = apiRes.headers['set-cookie'];

    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];

      for (const cookieString of cookieArray) {
        const parsed = parse(cookieString);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };

        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken, options);
        }

        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    const message = apiError.response?.data?.error ?? getStatusMessage(status) ?? apiError.message;

    return NextResponse.json({ error: message }, { status });
  }
}
