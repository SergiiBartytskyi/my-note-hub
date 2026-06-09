import { NextRequest, NextResponse } from 'next/server';
import { serverAPI } from '../../../../lib/services/serverAPI';
import { ApiError } from '@/types/api';
import { fetchNoteByIdServer } from '../../../../lib/services/serverNoteService';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const data = await fetchNoteByIdServer(id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status ?? 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const { data } = await serverAPI.delete(`/notes/${id}`);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status ?? 500 }
    );
  }
}
