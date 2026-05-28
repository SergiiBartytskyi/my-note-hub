import { cache } from 'react';
import { NoteTag, NoteDto } from '@/types/note';
import { serverAPI } from './serverAPI';

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}

export const fetchNotesServer = async ({
  search,
  tag,
  page,
  perPage = 12,
  sortBy = 'created',
}: FetchNotesParams) => {
  const { data } = await serverAPI.get('/notes', {
    params: { search, tag, page, perPage, sortBy },
  });
  return data;
};

export const fetchNoteByIdServer = cache(async (id: string): Promise<NoteDto> => {
  const { data } = await serverAPI.get(`/notes/${id}`);
  return data;
});
