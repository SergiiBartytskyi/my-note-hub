import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverAPI, ApiError } from '@/lib/services/serverAPI';
import { getStatusMessage } from '@/utils/getStatusMessage';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await serverAPI.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    const message = apiError.response?.data?.error ?? getStatusMessage(status) ?? apiError.message;

    return NextResponse.json({ error: message }, { status });
  }
}
