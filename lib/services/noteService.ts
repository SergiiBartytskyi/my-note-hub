import type { NoteDto, NoteTag, NoteFormValues } from '../../types/note';
import { clientAPI } from './clientAPI';

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}

export interface FetchNotesResponse {
  notes: NoteDto[];
  totalPages: number;
}

export const fetchNotes = async ({
  search = '',
  tag,
  page = 1,
  perPage = 12,
  sortBy = 'created',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await clientAPI.get<FetchNotesResponse>(`/api/notes`, {
    params: {
      search: search || undefined,
      tag: tag || undefined,
      page,
      perPage,
      sortBy,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<NoteDto> => {
  const { data } = await clientAPI.get<NoteDto>(`/api/notes/${id}`);

  return data;
};

export const createNote = async (noteData: Partial<NoteDto>): Promise<NoteDto> => {
  const { data } = await clientAPI.post<NoteDto>(`/api/notes`, noteData);

  return data;
};

export const deleteNote = async (id: string): Promise<NoteDto> => {
  const { data } = await clientAPI.delete<NoteDto>(`/api/notes/${id}`);

  return data;
};

export const updateNote = async ({
  id,
  values,
}: {
  id: string;
  values: NoteFormValues;
}): Promise<NoteDto> => {
  const { data } = await clientAPI.patch(`/api/notes/${id}`, values);
  return data;
};
