export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverAPI, ApiError } from '@/lib/services/serverAPI';
import { getStatusMessage } from '@/utils/getStatusMessage';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await serverAPI.get('users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    const message = apiError.response?.data?.error ?? getStatusMessage(status) ?? apiError.message;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await serverAPI.patch('users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    const message = apiError.response?.data?.error ?? getStatusMessage(status) ?? apiError.message;

    return NextResponse.json({ error: message }, { status });
  }
}
