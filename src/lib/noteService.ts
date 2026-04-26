import { axiosAPI } from './axiosAPI';
import type { NoteDto } from '../types/note';

interface FetchNotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}

export interface FetchNotesResponse {
  notes: NoteDto[];
  totalPages: number;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// export const getCategories = async () => {
//   const response = await axiosAPI.get<Category[]>('/categories');
//   return response.data;
// };
// export const getCategories = async () => {
//   try {
//     const response = await axiosAPI.get<Category[]>('/categories');
//     console.log('response :>> ', response);
//     return response.data;
//   } catch (error) {
//     console.error('getCategories failed:', error);
//     throw error;
//   }
// };

export const fetchNotes = async ({
  search,
  tag,
  page = 1,
  perPage = 12,
  sortBy = 'created',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosAPI.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      tag,
      page,
      perPage,
      sortBy,
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
