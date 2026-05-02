'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/noteService';
import { NoteTag } from '@/types/note';

interface UseNotesParams {
  search: string;
  tag?: NoteTag;
  page: number;
}

export const useNotes = ({ search, tag, page }: UseNotesParams) => {
  return useQuery({
    queryKey: ['notes', search, tag ?? 'all', page],
    queryFn: () => fetchNotes({ search, tag, page }),
    placeholderData: keepPreviousData,
  });
};
