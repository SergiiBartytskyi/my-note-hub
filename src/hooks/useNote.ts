'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/noteService';

export const useNote = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id) && enabled,
    retry: false,
  });
};
