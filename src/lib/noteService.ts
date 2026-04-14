import { axiosAPI } from './axiosAPI';
import type { NoteDto } from '../types/note';

interface FetchNotesParams {
  search: string;
  page: number;
}

export interface FetchNotesResponse {
  notes: NoteDto[];
  totalPages: number;
}

export const fetchNotes = async ({
  search,
  page = 1,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosAPI.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<NoteDto> => {
  const response = await axiosAPI.get<NoteDto>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: Partial<NoteDto>): Promise<NoteDto> => {
  const response = await axiosAPI.post<NoteDto>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<NoteDto> => {
  const response = await axiosAPI.delete(`/notes/${noteId}`);
  return response.data;
};
