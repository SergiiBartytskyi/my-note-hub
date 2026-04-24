'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/noteService';

interface UseNotesParams {
  search: string;
  categoryId?: string;
  page: number;
}

export const useNotes = ({ search, categoryId, page }: UseNotesParams) => {
  return useQuery({
    queryKey: ['notes', search, categoryId, page],
    queryFn: () => fetchNotes({ search, categoryId, page }),
    placeholderData: keepPreviousData,
  });
};
