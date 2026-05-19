import axios from 'axios';
import type { NoteDto, NoteTag } from '../types/note';

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

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  return process.env.NOTEHUB_APP_URL ?? 'http://localhost:3000';
};

export const fetchNotes = async ({
  search = '',
  tag,
  page = 1,
  perPage = 12,
  sortBy = 'created',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const baseUrl = getBaseUrl();

  const response = await axios.get<FetchNotesResponse>(`${baseUrl}/api/notes`, {
    params: {
      search: search || undefined,
      tag: tag || undefined,
      page,
      perPage,
      sortBy,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<NoteDto> => {
  const baseUrl = getBaseUrl();

  const response = await axios.get<NoteDto>(`${baseUrl}/api/notes/${id}`);

  return response.data;
};

export const createNote = async (noteData: Partial<NoteDto>): Promise<NoteDto> => {
  const baseUrl = getBaseUrl();

  const response = await axios.post<NoteDto>(`${baseUrl}/api/notes`, noteData);

  return response.data;
};

export const deleteNote = async (id: string): Promise<NoteDto> => {
  const baseUrl = getBaseUrl();

  const response = await axios.delete<NoteDto>(`${baseUrl}/api/notes/${id}`);

  return response.data;
};
