import { NextRequest, NextResponse } from 'next/server';
import { serverAPI, ApiError } from '../../../lib/services/serverAPI';
import { fetchNotesServer } from '../../../lib/services/serverNoteService';
import { isNoteTag, isSortBy } from '@/utils/typeGuards';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1');
  const perPage = parseInt(request.nextUrl.searchParams.get('perPage') ?? '12');

  const tagParam = request.nextUrl.searchParams.get('tag');
  const tag = isNoteTag(tagParam) ? tagParam : undefined;

  const sortByParam = request.nextUrl.searchParams.get('sortBy');
  const sortBy = isSortBy(sortByParam) ? sortByParam : 'created';

  try {
    const data = await fetchNotesServer({
      search,
      tag,
      page,
      perPage,
      sortBy,
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
