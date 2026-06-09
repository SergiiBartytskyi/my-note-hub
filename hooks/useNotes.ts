'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../lib/services/noteService';
import { NoteTag } from '../types/note';
import { useMe } from './useMe';

interface UseNotesParams {
  search: string;
  tag?: NoteTag;
  page: number;
}

export const useNotes = ({ search, tag, page }: UseNotesParams) => {
  const { data: user } = useMe();
  const isAuthenticated = !!user;

  return useQuery({
    queryKey: ['notes', search, tag ?? 'all', page],
    queryFn: () => fetchNotes({ search, tag, page }),
    placeholderData: keepPreviousData,
    enabled: isAuthenticated,
  });
};
