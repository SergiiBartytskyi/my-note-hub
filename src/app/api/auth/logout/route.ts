import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError, serverAPI } from '@/lib/services/serverAPI';
import { getStatusMessage } from '@/utils/getStatusMessage';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    await serverAPI.post('auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    const message = apiError.response?.data?.error ?? getStatusMessage(status) ?? apiError.message;

    return NextResponse.json({ error: message }, { status });
  }
}
