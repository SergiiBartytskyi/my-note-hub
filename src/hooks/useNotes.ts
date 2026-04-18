'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/noteService';

interface UseNotesParams {
  search: string;
  page: number;
}

export const useNotes = ({ search, page }: UseNotesParams) => {
  return useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
  });
};
