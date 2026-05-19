import { NextRequest, NextResponse } from 'next/server';
import { serverAPI, ApiError } from '../serverAPI';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const tag = request.nextUrl.searchParams.get('tag') ?? undefined;
  const page = request.nextUrl.searchParams.get('page') ?? '1';
  const perPage = request.nextUrl.searchParams.get('perPage') ?? '12';
  const sortBy = request.nextUrl.searchParams.get('sortBy') ?? 'created';

  try {
    const { data } = await serverAPI.get('/notes', {
      params: { search, tag, page, perPage, sortBy },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { data } = await serverAPI.post('/notes', body);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}
